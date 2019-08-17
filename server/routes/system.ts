import fs from 'fs';
import path from 'path';
import axios from 'axios';
import assert from 'assert';
import ip from 'ip';
import { promisify } from 'util';

import {
    getMemoryData,
    MemoryDataStorageKey,
    existMemoryData,
    addMemoryData,
    deleteMemoryData,
} from '../memoryData';

import User from '../models/user';
import Group from '../models/group';

import config from '../../config/server';
import { SealTimeout } from '../../utils/const';
import { KoaContext } from '../../types/koa';

/** 百度语言合成token */
let baiduToken = '';
/** 最后一次获取token的时间 */
let lastBaiduTokenTime = Date.now();

interface SearchData {
    /** 关键字 */
    keywords: string;
}

/**
 * 搜索用户和群组
 * @param ctx Context
 */
export async function search(ctx: KoaContext<SearchData>) {
    const { keywords } = ctx.data;
    if (keywords === '') {
        return {
            users: [],
            groups: [],
        };
    }

    const users = await User.find({ username: { $regex: keywords } }, { avatar: 1, username: 1 });
    const groups = await Group.find(
        { name: { $regex: keywords } },
        { avatar: 1, name: 1, members: 1 },
    );

    return {
        users,
        groups: groups.map((group) => ({
            _id: group._id,
            avatar: group.avatar,
            name: group.name,
            members: group.members.length,
        })),
    };
}

interface SearchExpressionData {
    /** 关键字 */
    keywords: string;
}

/**
 * 搜索表情包, 爬其它站资源
 * @param ctx Context
 */
export async function searchExpression(ctx: KoaContext<SearchExpressionData>) {
    const { keywords } = ctx.data;
    if (keywords === '') {
        return [];
    }

    const res = await axios.get(
        `https://www.doutula.com/search?keyword=${encodeURIComponent(keywords)}`,
    );
    assert(res.status === 200, '搜索表情包失败, 请重试');

    const images = res.data.match(/data-original="[^ "]+"/g) || [];
    return images.map((i) => i.substring(15, i.length - 1));
}

/**
 * 获取百度语言合成token
 */
export async function getBaiduToken() {
    if (baiduToken && Date.now() < lastBaiduTokenTime) {
        return { token: baiduToken };
    }

    const res = await axios.get(
        'https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=pw152BzvaSZVwrUf3Z2OHXM6&client_secret=fa273cc704b080e85ad61719abbf7794',
    );
    assert(res.status === 200, '请求百度token失败');

    baiduToken = res.data.access_token;
    lastBaiduTokenTime = Date.now() + (res.data.expires_in - 60 * 60 * 24) * 1000;
    return { token: baiduToken };
}

interface SealUserData {
    /** 用户名 */
    username: string;
}

/**
 * 封禁用户, 需要管理员权限
 * @param ctx Context
 */
export async function sealUser(ctx: KoaContext<SealUserData>) {
    const { username } = ctx.data;
    assert(username !== '', 'username不能为空');

    const user = await User.findOne({ username });
    assert(user, '用户不存在');

    const userId = user._id.toString();
    assert(!existMemoryData(MemoryDataStorageKey.SealList, userId), '用户已在封禁名单');

    addMemoryData(MemoryDataStorageKey.SealList, userId);
    setTimeout(() => {
        deleteMemoryData(MemoryDataStorageKey.SealList, userId);
    }, SealTimeout);

    return {
        msg: 'ok',
    };
}

/**
 * 获取已封禁的用户列表, 需要管理员权限
 */
export async function getSealList() {
    const sealList = getMemoryData(MemoryDataStorageKey.SealList);
    const userIds = [...sealList.keys()];
    const users = await User.find({ _id: { $in: userIds } });
    const result = users.map((user) => user.username);
    return result;
}

interface UploadFileData {
    /** 文件名 */
    fileName: string;
    /** 文件内容 */
    file: any;
}

export async function uploadFile(ctx) {
    assert(
        config.qiniuAccessKey === ''
            || config.qiniuBucket === ''
            || config.qiniuBucket === ''
            || config.qiniuUrlPrefix === '',
        '已配置七牛, 请使用七牛文件上传',
    );

    try {
        await promisify(fs.writeFile)(
            path.resolve(__dirname, `../../public/${ctx.data.fileName}`),
            ctx.data.file,
        );
        return {
            url: `${
                process.env.NODE_ENV === 'production' ? '' : `http://${ip.address()}:${config.port}`
            }/${ctx.data.fileName}`,
        };
    } catch (err) {
        console.error(err);
        return `上传文件失败:${err.message}`;
    }
}
