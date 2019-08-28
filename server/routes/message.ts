import assert from 'assert';
import { Types } from 'mongoose';

import User from '../models/user';
import Group from '../models/group';
import Message from '../models/message';
import Socket from '../models/socket';

import xss from '../../utils/xss';
import { KoaContext } from '../../types/koa';

const { isValid } = Types.ObjectId;

/** 初次获取历史消息数 */
const FirstTimeMessagesCount = 15;
/** 每次调用接口获取的历史消息数 */
const EachFetchMessagesCount = 30;

/** 石头剪刀布, 用于随机生成结果 */
const RPS = ['石头', '剪刀', '布'];

interface SendMessageData {
    /** 消息目标 */
    to: string;
    /** 消息类型 */
    type: string;
    /** 消息内容 */
    content: string;
}

/**
 * 发送消息
 * 如果是发送给群组, to是群组id
 * 如果是发送给个人, to是俩人id按大小序拼接后的值
 * @param ctx Context
 */
export async function sendMessage(ctx: KoaContext<SendMessageData>) {
    const { to, content } = ctx.data;
    let { type } = ctx.data;
    assert(to, 'to不能为空');

    let groupId = '';
    let userId = '';
    if (isValid(to)) {
        groupId = to;
        const group = await Group.findOne({ _id: to });
        assert(group, '群组不存在');
    } else {
        userId = to.replace(ctx.socket.user.toString(), '');
        assert(isValid(userId), '无效的用户ID');
        const user = await User.findOne({ _id: userId });
        assert(user, '用户不存在');
    }

    let messageContent = content;
    if (type === 'text') {
        assert(messageContent.length <= 2048, '消息长度过长');

        const rollRegex = /^-roll( ([0-9]*))?$/;
        if (rollRegex.test(messageContent)) {
            const regexResult = rollRegex.exec(messageContent);
            if (regexResult) {
                let numberStr = regexResult[1] || '100';
                if (numberStr.length > 5) {
                    numberStr = '99999';
                }
                const number = parseInt(numberStr, 10);
                type = 'system';
                messageContent = JSON.stringify({
                    command: 'roll',
                    value: Math.floor(Math.random() * (number + 1)),
                    top: number,
                });
            }
        } else if (/^-rps$/.test(messageContent)) {
            type = 'system';
            messageContent = JSON.stringify({
                command: 'rps',
                value: RPS[Math.floor(Math.random() * RPS.length)],
            });
        }
        messageContent = xss(messageContent);
    } else if (type === 'invite') {
        const group = await Group.findOne({ name: content });
        assert(group, '目标群组不存在');

        const user = await User.findOne({ _id: ctx.socket.user });
        messageContent = JSON.stringify({
            inviter: user.username,
            groupId: group._id,
            groupName: group.name,
        });
    }

    const message = await Message.create({
        from: ctx.socket.user,
        to,
        type,
        content: messageContent,
    });

    const user = await User.findOne({ _id: ctx.socket.user }, { username: 1, avatar: 1, tag: 1 });
    const messageData = {
        _id: message._id,
        createTime: message.createTime,
        from: user.toObject(),
        to,
        type,
        content: messageContent,
    };

    if (groupId) {
        ctx.socket.to(groupId).emit('message', messageData);
    } else {
        const sockets = await Socket.find({ user: userId });
        sockets.forEach((socket) => {
            ctx._io.to(socket.id).emit('message', messageData);
        });
        const selfSockets = await Socket.find({ user: ctx.socket.user });
        selfSockets.forEach((socket) => {
            if (socket.id !== ctx.socket.id) {
                ctx._io.to(socket.id).emit('message', messageData);
            }
        });
    }

    return messageData;
}

interface GetLinkmanLastMessagesData {
    /** 联系人id列表 */
    linkmans: string[];
}

/**
 * 获取一组联系人的最后历史消息
 * @param ctx Context
 */
export async function getLinkmansLastMessages(ctx: KoaContext<GetLinkmanLastMessagesData>) {
    const { linkmans } = ctx.data;
    assert(Array.isArray(linkmans), '参数linkmans应该是Array');

    const promises = linkmans.map((linkmanId) =>
        Message.find(
            { to: linkmanId },
            {
                type: 1,
                content: 1,
                from: 1,
                createTime: 1,
            },
            { sort: { createTime: -1 }, limit: FirstTimeMessagesCount },
        ).populate('from', { username: 1, avatar: 1, tag: 1 }));
    const results = await Promise.all(promises);
    const messages = linkmans.reduce((result, linkmanId, index) => {
        result[linkmanId] = ((results[index] || []) as Array<unknown>).reverse();
        return result;
    }, {});

    return messages;
}

interface GetLinkmanHistoryMessagesData {
    /** 联系人id */
    linkmanId: string;
    /** 客户端目前已有的历史消息数量 */
    existCount: number;
}

/**
 * 获取联系人的历史消息
 * @param ctx Context
 */
export async function getLinkmanHistoryMessages(ctx: KoaContext<GetLinkmanHistoryMessagesData>) {
    const { linkmanId, existCount } = ctx.data;

    const messages = await Message.find(
        { to: linkmanId },
        {
            type: 1,
            content: 1,
            from: 1,
            createTime: 1,
        },
        { sort: { createTime: -1 }, limit: EachFetchMessagesCount + existCount },
    ).populate('from', { username: 1, avatar: 1, tag: 1 });
    const result = messages.slice(existCount).reverse();
    return result;
}

interface GetDefaultGroupHistoryMessagesData {
    /** 客户端目前已有的历史消息数量 */
    existCount: number;
}

/**
 * 获取默认群组的历史消息
 * @param ctx Context
 */
export async function getDefalutGroupHistoryMessages(
    ctx: KoaContext<GetDefaultGroupHistoryMessagesData>,
) {
    const { existCount } = ctx.data;

    const group = await Group.findOne({ isDefault: true });
    const messages = await Message.find(
        { to: group._id },
        {
            type: 1,
            content: 1,
            from: 1,
            createTime: 1,
        },
        { sort: { createTime: -1 }, limit: EachFetchMessagesCount + existCount },
    ).populate('from', { username: 1, avatar: 1, tag: 1 });
    const result = messages.slice(existCount).reverse();
    return result;
}
