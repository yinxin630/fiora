/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import assert, { AssertionError } from 'assert';
import { Types } from 'mongoose';
import { Expo } from 'expo-server-sdk';

import User, { UserDocument } from '../models/user';
import Group, { GroupDocument } from '../models/group';
import Message, { MessageDocument } from '../models/message';
import Socket from '../models/socket';

import xss from '../../utils/xss';
import { KoaContext } from '../../types/koa';
import client from '../../config/client';

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

async function handleInviteV2Message(message: SendMessageData) {
    if (message.type === 'inviteV2') {
        const inviteInfo = JSON.parse(message.content);
        if (inviteInfo.inviter && inviteInfo.group) {
            const [user, group] = await Promise.all([
                User.findOne({ _id: inviteInfo.inviter }),
                Group.findOne({ _id: inviteInfo.group }),
            ]);
            if (user && group) {
                message.content = JSON.stringify({
                    inviter: inviteInfo.inviter,
                    inviterName: user?.username,
                    group: inviteInfo.group,
                    groupName: group.name,
                });
            }
        }
    }
}

async function pushNotification(
    notificationTokens: string[],
    message: MessageDocument,
    groupName?: string,
) {
    const expo = new Expo({});

    const content = message.type === 'text' ? message.content : `[${message.type}]`;
    const pushMessages = notificationTokens.map((notificationToken) => ({
        to: notificationToken,
        sound: 'default',
        title: groupName || (message.from as any).username,
        body: groupName ? `${(message.from as any).username}: ${content}` : content,
        data: { focus: message.to },
    }));

    const chunks = expo.chunkPushNotifications(pushMessages as any);
    for (const chunk of chunks) {
        try {
            await expo.sendPushNotificationsAsync(chunk);
        } catch (error) {
            console.error('Send notification fail.', error.message);
        }
    }
}

export async function handleInviteV2Messages(messages: SendMessageData[]) {
    return Promise.all(
        messages.map(async (message) => {
            if (message.type === 'inviteV2') {
                await handleInviteV2Message(message);
            }
        }),
    );
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

    let toGroup: GroupDocument | null = null;
    let toUser: UserDocument | null = null;
    if (isValid(to)) {
        toGroup = await Group.findOne({ _id: to });
        assert(toGroup, '群组不存在');
    } else {
        const userId = to.replace(ctx.socket.user.toString(), '');
        assert(isValid(userId), '无效的用户ID');
        toUser = await User.findOne({ _id: userId });
        assert(toUser, '用户不存在');
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
    } else if (type === 'file') {
        const file: { size: number } = JSON.parse(content);
        assert(file.size < client.maxFileSize, '要发送的文件过大');
        messageContent = content;
    } else if (type === 'inviteV2') {
        const shareTargetGroup = await Group.findOne({ _id: content });
        if (!shareTargetGroup) {
            throw new AssertionError({ message: '目标群组不存在' });
        }
        const user = await User.findOne({ _id: ctx.socket.user });
        if (!user) {
            throw new AssertionError({ message: '用户不存在' });
        }
        messageContent = JSON.stringify({
            inviter: user._id,
            group: shareTargetGroup._id,
        });
    }

    const user = await User.findOne({ _id: ctx.socket.user }, { username: 1, avatar: 1, tag: 1 });
    if (!user) {
        throw new AssertionError({ message: '用户不存在' });
    }

    const message = await Message.create({
        from: ctx.socket.user,
        to,
        type,
        content: messageContent,
    } as MessageDocument);

    const messageData = {
        _id: message._id,
        createTime: message.createTime,
        from: user.toObject(),
        to,
        type,
        content: message.content,
    };
    if (type === 'inviteV2') {
        await handleInviteV2Message(messageData);
    }

    if (toGroup) {
        ctx.socket.to(toGroup._id).emit('message', messageData);

        const users = await User.find({
            _id: {
                $in: toGroup.members,
            },
        });
        const notificationTokens: string[] = [];
        users.forEach((groupMember) => {
            // Messages sent by yourself don’t push notification to yourself
            if (groupMember._id.toString() === ctx.socket.user.toString()) {
                return;
            }
            if (groupMember?.notificationTokens?.length) {
                notificationTokens.push(...groupMember!.notificationTokens);
            }
        });
        if (notificationTokens.length) {
            pushNotification(notificationTokens, messageData as MessageDocument, toGroup.name);
        }
    } else {
        const sockets = await Socket.find({ user: toUser?._id });
        sockets.forEach((socket) => {
            ctx._io.to(socket.id).emit('message', messageData);
        });
        const selfSockets = await Socket.find({ user: ctx.socket.user });
        selfSockets.forEach((socket) => {
            if (socket.id !== ctx.socket.id) {
                ctx._io.to(socket.id).emit('message', messageData);
            }
        });

        const notificationTokens = toUser?.notificationTokens || [];
        if (notificationTokens.length) {
            pushNotification(notificationTokens, messageData as MessageDocument);
        }
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

    const promises = linkmans.map(async (linkmanId) => {
        const messages = await Message.find(
            { to: linkmanId },
            {
                type: 1,
                content: 1,
                from: 1,
                createTime: 1,
            },
            { sort: { createTime: -1 }, limit: FirstTimeMessagesCount },
        ).populate('from', { username: 1, avatar: 1, tag: 1 });
        await handleInviteV2Messages(messages);
        return messages;
    });
    const results = await Promise.all(promises);
    type Messages = {
        [linkmanId: string]: MessageDocument[];
    };
    const messages = linkmans.reduce((result: Messages, linkmanId, index) => {
        result[linkmanId] = (results[index] || []).reverse();
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
    await handleInviteV2Messages(messages);
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
export async function getDefaultGroupHistoryMessages(
    ctx: KoaContext<GetDefaultGroupHistoryMessagesData>,
) {
    const { existCount } = ctx.data;

    const group = await Group.findOne({ isDefault: true });
    if (!group) {
        throw new AssertionError({ message: '默认群组不存在' });
    }
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
    await handleInviteV2Messages(messages);
    const result = messages.slice(existCount).reverse();
    return result;
}

interface DeleteMessageData {
    /** 消息id */
    messageId: string;
}

/**
 * 删除消息, 需要管理员权限
 */
export async function deleteMessage(ctx: KoaContext<{ messageId: string }>) {
    const { messageId } = ctx.data;
    assert(messageId, 'messageId不能为空');

    const message = await Message.findOne({ _id: messageId });
    if (!message) {
        throw new AssertionError({ message: '消息不存在' });
    }
    assert(
        ctx.socket.isAdmin || message.from.toString() === ctx.socket.user.toString(),
        '只能撤回本人的消息',
    );

    await message.remove();

    /**
     * 广播删除消息通知, 区分群消息和私聊消息
     */
    const messageName = 'deleteMessage';
    const messageData = {
        linkmanId: message.to.toString(),
        messageId,
    };
    if (isValid(message.to)) {
        // 群消息
        ctx.socket.to(message.to).emit(messageName, messageData);
    } else {
        // 私聊消息
        const targetUserId = message.to.replace(ctx.socket.user.toString(), '');
        const sockets = await Socket.find({ user: targetUserId });
        sockets.forEach((socket) => {
            ctx._io.to(socket.id).emit(messageName, messageData);
        });
        const selfSockets = await Socket.find({ user: ctx.socket.user });
        selfSockets.forEach((socket) => {
            if (socket.id !== ctx.socket.id) {
                ctx._io.to(socket.id).emit(messageName, messageData);
            }
        });
    }

    return {
        msg: 'ok',
    };
}
