import fetch from '../utils/fetch';
import { User } from './state/reducer';

/**
 * 使用token登录
 * @param token 登录token
 * @param os 系统
 * @param browser 浏览器
 * @param environment 环境信息
 */
export async function loginByToken(
    token: string,
    os: string,
    browser: string,
    environment: string,
) {
    const [err, res] = await fetch(
        'loginByToken',
        {
            token,
            os,
            browser,
            environment,
        },
        { toast: false },
    );

    if (err) {
        return null;
    }
    return res;
}

/**
 * 游客模式登陆
 * @param os 系统
 * @param browser 浏览器
 * @param environment 环境信息
 */
export async function guest(os: string, browser: string, environment: string) {
    const [err, res] = await fetch('guest', { os, browser, environment });
    if (err) {
        return null;
    }
    return res;
}

/**
 * 修用户头像
 * @param avatar 新头像链接
 */
export async function changeAvatar(avatar) {
    const [error] = await fetch('changeAvatar', { avatar });
    return !error;
}

/**
 * 修改用户密码
 * @param oldPassword 旧密码
 * @param newPassword 新密码
 */
export async function changePassword(oldPassword: string, newPassword: string) {
    const [error] = await fetch('changePassword', {
        oldPassword,
        newPassword,
    });
    return !error;
}

/**
 * 修改用户名
 * @param username 新用户名
 */
export async function changeUsername(username: string) {
    const [error] = await fetch('changeUsername', {
        username,
    });
    return !error;
}

/**
 * 创建群组
 * @param groupName 群组名
 */
export async function createGroup(groupName: string) {
    const [, group] = await fetch('createGroup', { groupName });
    return group;
}

/**
 * 加入群组
 * @param groupId 群组id
 */
export async function joinGroup(groupId: string) {
    const [, group] = await fetch('joinGroup', { groupId });
    return group;
}

/**
 * 添加好友
 * @param userId 目标用户id
 */
export async function addFriend(userId: string) {
    const [, user] = await fetch<User>('addFriend', { userId });
    return user;
}

/**
 * 删除好友
 * @param userId 目标用户id
 */
export async function deleteFriend(userId: string) {
    const [err] = await fetch('deleteFriend', { userId });
    return !err;
}

/**
 * 获取联系人历史消息
 * @param linkmanId 联系人id
 * @param existCount 客户端已有消息条数
 */
export async function getLinkmanHistoryMessages(linkmanId: string, existCount: number) {
    const [, messages] = await fetch('getLinkmanHistoryMessages', { linkmanId, existCount });
    return messages;
}

/**
 * 搜索用户和群组
 * @param keywords 关键字
 */
export async function search(keywords: string) {
    const [, result] = await fetch('search', { keywords });
    return result;
}

/**
 * 封禁用户
 * @param username 目标用户名
 */
export async function sealUser(username: string) {
    const [err] = await fetch('sealUser', { username });
    return !err;
}
