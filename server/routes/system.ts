import fs from 'fs';
import path from 'path';
import axios from 'axios';
import assert from 'assert';
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
import { SealUserTimeout, SealIpTimeout } from '../../utils/const';
import { KoaContext } from '../../types/koa';
import Socket from '../models/socket';

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

    const res = await axios({
        method: 'get',
        url: `https://pic.sogou.com/pics/json.jsp?query=${encodeURIComponent(
            `${keywords} 表情`,
        )}&st=5&start=0&xml_len=60&callback=callback&reqFrom=wap_result&`,
        headers: {
            accept: '*/*',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
            'cache-control': 'no-cache',
            pragma: 'no-cache',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            referrer: `https://pic.sogou.com/pic/emo/searchList.jsp?statref=search_form&uID=hTHHybkSPt37C46z&spver=0&rcer=&keyword=${encodeURIComponent(
                keywords,
            )}`,
            referrerPolicy: 'no-referrer-when-downgrade',
            'user-agent':
                'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        },
    });
    assert(res.status === 200, '搜索表情包失败, 请重试');

    try {
        const parseDataResult = res.data.match(/callback\((.+)\)/);
        const data = JSON.parse(`${parseDataResult[1]}`);
        const images = data.items;
        return images.map(({ locImageLink, width, height }) => ({
            image: locImageLink,
            width,
            height,
        }));
    } catch (err) {
        assert(false, '搜索表情包失败, 数据解析异常');
    }

    return [];
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
    assert(!existMemoryData(MemoryDataStorageKey.SealUserList, userId), '用户已在封禁名单');

    addMemoryData(MemoryDataStorageKey.SealUserList, userId);
    setTimeout(() => {
        deleteMemoryData(MemoryDataStorageKey.SealUserList, userId);
    }, SealUserTimeout);

    return {
        msg: 'ok',
    };
}

/**
 * 获取封禁列表, 包含用户封禁和ip封禁, 需要管理员权限
 */
export async function getSealList() {
    const sealUserList = getMemoryData(MemoryDataStorageKey.SealUserList);
    const sealIpList = getMemoryData(MemoryDataStorageKey.SealIpList);
    const userIds = [...sealUserList.keys()];
    const users = await User.find({ _id: { $in: userIds } });

    const result = {
        users: users.map((user) => user.username),
        ips: Array.from(sealIpList.keys()),
    };
    return result;
}

const CantSealLocalIp = '不能封禁内网ip';
const CantSealSelf = '闲的没事封自己干啥';
const IpInSealList = 'ip已在封禁名单';

/**
 * 封禁 ip 地址, 需要管理员权限
 */
export async function sealIp(ctx: KoaContext<{ ip: string }>) {
    const { ip } = ctx.data;
    assert(ip !== '::1' && ip !== '127.0.0.1', CantSealLocalIp);
    assert(ip !== ctx.socket.ip, CantSealSelf);
    assert(!existMemoryData(MemoryDataStorageKey.SealIpList, ip), IpInSealList);

    addMemoryData(MemoryDataStorageKey.SealIpList, ip);
    setTimeout(() => {
        deleteMemoryData(MemoryDataStorageKey.SealIpList, ip);
    }, SealIpTimeout);

    return {
        msg: 'ok',
    };
}

/**
 * 封禁指定用户的所有在线 ip 地址, 需要管理员权限
 */
export async function sealUserOnlineIp(ctx: KoaContext<{ userId: string }>) {
    const { userId } = ctx.data;

    const sockets = await Socket.find({ user: userId });
    const ipList = sockets.map((socket) => socket.ip);

    // 如果全部 ip 都已经封禁过了, 则直接提示
    assert(
        !ipList.every((ip) => existMemoryData(MemoryDataStorageKey.SealIpList, ip)),
        IpInSealList,
    );

    let errorMessage = '';
    ipList.forEach((ip) => {
        if (ip === '::1' || ip === '127.0.0.1') {
            errorMessage = CantSealLocalIp;
        } else if (ip === ctx.socket.ip) {
            errorMessage = CantSealSelf;
        } else if (!existMemoryData(MemoryDataStorageKey.SealIpList, ip)) {
            addMemoryData(MemoryDataStorageKey.SealIpList, ip);
            setTimeout(() => {
                deleteMemoryData(MemoryDataStorageKey.SealIpList, ip);
            }, SealIpTimeout);
        }
    });

    if (errorMessage) {
        return errorMessage;
    }

    return {
        msg: 'ok',
    };
}

interface UploadFileData {
    /** 文件名 */
    fileName: string;
    /** 文件内容 */
    file: any;
}

export async function uploadFile(ctx: KoaContext<UploadFileData>) {
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
            url: `/${ctx.data.fileName}`,
        };
    } catch (err) {
        console.error(err);
        return `上传文件失败:${err.message}`;
    }
}
