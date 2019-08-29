import bcrypt from 'bcryptjs';
import assert from 'assert';
import jwt from 'jwt-simple';
import { Types } from 'mongoose';
import { promisify } from 'util';

import { addMemoryData, MemoryDataStorageKey, deleteMemoryData } from '../memoryData';

import User, { UserDocument } from '../models/user';
import Group from '../models/group';
import Friend from '../models/friend';
import Socket from '../models/socket';
import Message from '../models/message';

import config from '../../config/server';
import getRandomAvatar from '../../utils/getRandomAvatar';
import { KoaContext } from '../../types/koa';

const { isValid } = Types.ObjectId;

/** 加密salt位数 */
const saltRounds = 10;

/** 一天时间 */
const OneDay = 1000 * 60 * 60 * 24;

interface Environment {
    /** 客户端系统 */
    os: string;
    /** 客户端浏览器 */
    browser: string;
    /** 客户端环境信息 */
    environment: string;
}

/**
 * 生成jwt token
 * @param user 用户
 * @param environment 客户端环境信息
 */
function generateToken(user: string, environment: string) {
    return jwt.encode(
        {
            user,
            environment,
            expires: Date.now() + config.tokenExpiresTime,
        },
        config.jwtSecret,
    );
}

/**
 * 处理注册时间不满24小时的用户
 * @param user 用户
 */
function handleNewUser(user: UserDocument) {
    // 将用户添加到新用户列表, 24小时后删除
    if (Date.now() - user.createTime.getTime() < OneDay) {
        const userId = user._id.toString();
        addMemoryData(MemoryDataStorageKey.NewUserList, userId);
        setTimeout(() => {
            deleteMemoryData(MemoryDataStorageKey.NewUserList, userId);
        }, OneDay);
    }
}

interface RegisterData extends Environment {
    /** 用户名 */
    username: string;
    /** 用户密码 */
    password: string;
}

/**
 * 注册新用户
 * @param ctx Context
 */
export async function register(ctx: KoaContext<RegisterData>) {
    const {
        username, password, os, browser, environment,
    } = ctx.data;
    assert(username, '用户名不能为空');
    assert(password, '密码不能为空');

    const user = await User.findOne({ username });
    assert(!user, '该用户名已存在');

    const defaultGroup = await Group.findOne({ isDefault: true });
    assert(defaultGroup, '默认群组不存在');

    const salt = await promisify(bcrypt.genSalt)(saltRounds);
    const hash = await promisify(bcrypt.hash)(password, salt);

    let newUser = null;
    try {
        newUser = await User.create({
            username,
            salt,
            password: hash,
            avatar: getRandomAvatar(),
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return '用户名包含不支持的字符或者长度超过限制';
        }
        throw err;
    }

    handleNewUser(newUser);

    if (!defaultGroup.creator) {
        defaultGroup.creator = newUser;
    }
    defaultGroup.members.push(newUser);
    await defaultGroup.save();

    const token = generateToken(newUser._id, environment);

    ctx.socket.user = newUser._id;
    await Socket.updateOne(
        { id: ctx.socket.id },
        {
            user: newUser._id,
            os,
            browser,
            environment,
        },
    );

    return {
        _id: newUser._id,
        avatar: newUser.avatar,
        username: newUser.username,
        groups: [
            {
                _id: defaultGroup._id,
                name: defaultGroup.name,
                avatar: defaultGroup.avatar,
                creator: defaultGroup.creator._id,
                createTime: defaultGroup.createTime,
                messages: [],
            },
        ],
        friends: [],
        token,
        isAdmin: false,
    };
}

type LoginData = RegisterData;

/**
 * 账密登录
 * @param ctx Context
 */
export async function login(ctx: KoaContext<LoginData>) {
    assert(!ctx.socket.user, '你已经登录了');

    const {
        username, password, os, browser, environment,
    } = ctx.data;
    assert(username, '用户名不能为空');
    assert(password, '密码不能为空');

    const user = await User.findOne({ username });
    assert(user, '该用户不存在');

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    assert(isPasswordCorrect, '密码错误');

    handleNewUser(user);

    user.lastLoginTime = new Date();
    await user.save();

    const groups = await Group.find(
        { members: user },
        {
            _id: 1,
            name: 1,
            avatar: 1,
            creator: 1,
            createTime: 1,
        },
    );
    groups.forEach((group) => {
        ctx.socket.join(group._id.toString());
    });

    const friends = await Friend.find({ from: user._id }).populate('to', {
        avatar: 1,
        username: 1,
    });

    const token = generateToken(user._id.toString(), environment);

    ctx.socket.user = user._id;
    await Socket.updateOne(
        { id: ctx.socket.id },
        {
            user: user._id,
            os,
            browser,
            environment,
        },
    );

    return {
        _id: user._id,
        avatar: user.avatar,
        username: user.username,
        tag: user.tag,
        groups,
        friends,
        token,
        isAdmin: user._id.toString() === config.administrator,
    };
}

interface LoginByTokenData extends Environment {
    /** 登录token */
    token: string;
}

/**
 * token登录
 * @param ctx Context
 */
export async function loginByToken(ctx: KoaContext<LoginByTokenData>) {
    assert(!ctx.socket.user, '你已经登录了');

    const {
        token, os, browser, environment,
    } = ctx.data;
    assert(token, 'token不能为空');

    let payload = null;
    try {
        payload = jwt.decode(token, config.jwtSecret);
    } catch (err) {
        return '非法token';
    }

    assert(Date.now() < payload.expires, 'token已过期');
    assert.equal(environment, payload.environment, '非法登录');

    const user = await User.findOne(
        { _id: payload.user },
        {
            _id: 1,
            avatar: 1,
            username: 1,
            tag: 1,
            createTime: 1,
        },
    );
    assert(user, '用户不存在');

    handleNewUser(user);

    user.lastLoginTime = new Date();
    await user.save();

    const groups = await Group.find(
        { members: user },
        {
            _id: 1,
            name: 1,
            avatar: 1,
            creator: 1,
            createTime: 1,
        },
    );
    groups.forEach((group) => {
        ctx.socket.join(group._id.toString());
    });

    const friends = await Friend.find({ from: user._id }).populate('to', {
        avatar: 1,
        username: 1,
    });

    ctx.socket.user = user._id;
    await Socket.updateOne(
        { id: ctx.socket.id },
        {
            user: user._id,
            os,
            browser,
            environment,
        },
    );

    return {
        _id: user._id,
        avatar: user.avatar,
        username: user.username,
        tag: user.tag,
        groups,
        friends,
        isAdmin: user._id.toString() === config.administrator,
    };
}

/**
 * 游客登录, 只能获取默认群组信息
 * @param ctx Context
 */
export async function guest(ctx: KoaContext<Environment>) {
    const { os, browser, environment } = ctx.data;

    await Socket.updateOne(
        { id: ctx.socket.id },
        {
            os,
            browser,
            environment,
        },
    );

    const group = await Group.findOne(
        { isDefault: true },
        {
            _id: 1,
            name: 1,
            avatar: 1,
            createTime: 1,
            creator: 1,
        },
    );
    ctx.socket.join(group._id.toString());

    const messages = await Message.find(
        { to: group._id },
        {
            type: 1,
            content: 1,
            from: 1,
            createTime: 1,
        },
        { sort: { createTime: -1 }, limit: 15 },
    ).populate('from', { username: 1, avatar: 1 });
    messages.reverse();

    return { messages, ...group.toObject() };
}

interface ChangeAvatarData {
    /** 新头像 */
    avatar: string;
}

/**
 * 修改用户头像
 * @param ctx Context
 */
export async function changeAvatar(ctx: KoaContext<ChangeAvatarData>) {
    const { avatar } = ctx.data;
    assert(avatar, '新头像链接不能为空');

    await User.updateOne(
        { _id: ctx.socket.user },
        {
            avatar,
        },
    );

    return {};
}

interface AddFriendData {
    userId: string;
}

/**
 * 添加好友, 单向添加
 * @param ctx Context
 */
export async function addFriend(ctx: KoaContext<AddFriendData>) {
    const { userId } = ctx.data;
    assert(isValid(userId), '无效的用户ID');
    assert(ctx.socket.user.toString() !== userId, '不能添加自己为好友');

    const user = await User.findOne({ _id: userId });
    assert(user, '添加好友失败, 用户不存在');

    const friend = await Friend.find({ from: ctx.socket.user, to: user._id });
    assert(friend.length === 0, '你们已经是好友了');

    const newFriend = await Friend.create({
        from: ctx.socket.user,
        to: user._id,
    });

    return {
        _id: user._id,
        username: user.username,
        avatar: user.avatar,
        from: newFriend.from,
        to: newFriend.to,
    };
}

interface AddFriendData {
    userId: string;
}

/**
 * 删除好友, 单向删除
 * @param ctx Context
 */
export async function deleteFriend(ctx: KoaContext<AddFriendData>) {
    const { userId } = ctx.data;
    assert(isValid(userId), '无效的用户ID');

    const user = await User.findOne({ _id: userId });
    assert(user, '用户不存在');

    await Friend.deleteOne({ from: ctx.socket.user, to: user._id });
    return {};
}

interface ChangePasswordData {
    /** 旧密码 */
    oldPassword: string;
    /** 新密码 */
    newPassword: string;
}

/**
 * 修改用户密码
 * @param ctx Context
 */
export async function changePassword(ctx: KoaContext<ChangePasswordData>) {
    const { oldPassword, newPassword } = ctx.data;
    assert(newPassword, '新密码不能为空');
    assert(oldPassword !== newPassword, '新密码不能与旧密码相同');

    const user = await User.findOne({ _id: ctx.socket.user });
    const isPasswordCorrect = bcrypt.compareSync(oldPassword, user.password);
    assert(isPasswordCorrect, '旧密码不正确');

    const salt = await promisify(bcrypt.genSalt)(saltRounds);
    const hash = await promisify(bcrypt.hash)(newPassword, salt);

    user.password = hash;
    await user.save();

    return {
        msg: 'ok',
    };
}

interface ChangeUsernameData {
    /** 新用户名 */
    username: string;
}

/**
 * 修改用户名
 * @param ctx Context
 */
export async function changeUsername(ctx: KoaContext<ChangeUsernameData>) {
    const { username } = ctx.data;
    assert(username, '新用户名不能为空');

    const user = await User.findOne({ username });
    assert(!user, '该用户名已存在, 换一个试试吧');

    const self = await User.findOne({ _id: ctx.socket.user });

    self.username = username;
    await self.save();

    return {
        msg: 'ok',
    };
}

type ResetUserPasswordData = ChangeUsernameData;

/**
 * 重置用户密码, 需要管理员权限
 * @param ctx Context
 */
export async function resetUserPassword(ctx: KoaContext<ResetUserPasswordData>) {
    const { username } = ctx.data;
    assert(username !== '', 'username不能为空');

    const user = await User.findOne({ username });
    assert(user, '用户不存在');

    const newPassword = 'helloworld';
    const salt = await promisify(bcrypt.genSalt)(saltRounds);
    const hash = await promisify(bcrypt.hash)(newPassword, salt);

    user.salt = salt;
    user.password = hash;
    await user.save();

    return {
        newPassword,
    };
}

interface SetUserTagData {
    username: string;
    tag: string;
}

/**
 * 更新用户标签, 需要管理员权限
 * @param ctx Context
 */
export async function setUserTag(ctx: KoaContext<SetUserTagData>) {
    const { username, tag } = ctx.data;
    assert(username !== '', 'username不能为空');
    assert(tag !== '', 'tag不能为空');
    assert(/^([0-9a-zA-Z]{1,2}|[\u4e00-\u9eff]){1,5}$/.test(tag), '标签不符合要求, 允许5个汉字或者10个字母');

    const user = await User.findOne({ username });
    assert(user, '用户不存在');

    user.tag = tag;
    await user.save();

    const sockets = await Socket.find({ user: user._id });
    sockets.forEach((socket) => {
        ctx._io.to(socket.id).emit('changeTag', user.tag);
    });

    return {
        msg: 'ok',
    };
}
