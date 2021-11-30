import fetch from './utils/fetch';
import { User, GroupMember } from './state/reducer';

function saveUsername(username: string) {
    window.localStorage.setItem('username', username);
}

/**
 * 注册新用户
 * @param username 用户名
 * @param password 密码
 * @param os 系统
 * @param browser 浏览器
 * @param environment 环境信息
 */
export async function register(
    username: string,
    password: string,
    os = '',
    browser = '',
    environment = '',
) {
    const [err, user] = await fetch('register', {
        username,
        password,
        os,
        browser,
        environment,
    });

    if (err) {
        return null;
    }

    saveUsername(user.username);
    return user;
}

/**
 * 使用账密登录
 * @param username 用户名
 * @param password 密码
 * @param os 系统
 * @param browser 浏览器
 * @param environment 环境信息
 */
export async function login(
    username: string,
    password: string,
    os = '',
    browser = '',
    environment = '',
) {
    const [err, user] = await fetch('login', {
        username,
        password,
        os,
        browser,
        environment,
    });

    if (err) {
        return null;
    }

    saveUsername(user.username);
    return user;
}

/**
 * 使用token登录
 * @param token 登录token
 * @param os 系统
 * @param browser 浏览器
 * @param environment 环境信息
 */
export async function loginByToken(
    token: string,
    os = '',
    browser = '',
    environment = '',
) {
    const [err, user] = await fetch(
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

    saveUsername(user.username);
    return user;
}

/**
 * 游客模式登陆
 * @param os 系统
 * @param browser 浏览器
 * @param environment 环境信息
 */
export async function guest(os = '', browser = '', environment = '') {
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
export async function changeAvatar(avatar: string) {
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
 * 修改群组名
 * @param groupId 目标群组
 * @param name 新名字
 */
export async function changeGroupName(groupId: string, name: string) {
    const [error] = await fetch('changeGroupName', { groupId, name });
    return !error;
}

/**
 * 修改群头像
 * @param groupId 目标群组
 * @param name 新头像
 */
export async function changeGroupAvatar(groupId: string, avatar: string) {
    const [error] = await fetch('changeGroupAvatar', { groupId, avatar });
    return !error;
}

/**
 * 创建群组
 * @param name 群组名
 */
export async function createGroup(name: string) {
    const [, group] = await fetch('createGroup', { name });
    return group;
}

/**
 * 删除群组
 * @param groupId 群组id
 */
export async function deleteGroup(groupId: string) {
    const [error] = await fetch('deleteGroup', { groupId });
    return !error;
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
 * 离开群组
 * @param groupId 群组id
 */
export async function leaveGroup(groupId: string) {
    const [error] = await fetch('leaveGroup', { groupId });
    return !error;
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
 * Get the last messages and unread number of a group of linkmans
 * @param linkmanIds Linkman ids who need to get the last messages
 */
export async function getLinkmansLastMessagesV2(linkmanIds: string[]) {
    const [, linkmanMessages] = await fetch('getLinkmansLastMessagesV2', {
        linkmans: linkmanIds,
    });
    return linkmanMessages;
}

/**
 * 获取联系人历史消息
 * @param linkmanId 联系人id
 * @param existCount 客户端已有消息条数
 */
export async function getLinkmanHistoryMessages(
    linkmanId: string,
    existCount: number,
) {
    const [, messages] = await fetch('getLinkmanHistoryMessages', {
        linkmanId,
        existCount,
    });
    return messages;
}

/**
 * 获取默认群组的历史消息
 * @param existCount 客户端已有消息条数
 */
export async function getDefaultGroupHistoryMessages(existCount: number) {
    const [, messages] = await fetch('getDefaultGroupHistoryMessages', {
        existCount,
    });
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
 * 搜索表情包
 * @param keywords 关键字
 */
export async function searchExpression(keywords: string) {
    const [, result] = await fetch('searchExpression', { keywords });
    return result;
}

/**
 * 发送消息
 * @param to 目标
 * @param type 消息类型
 * @param content 消息内容
 */
export async function sendMessage(to: string, type: string, content: string) {
    return fetch('sendMessage', { to, type, content });
}

/**
 * 删除消息
 * @param messageId 要删除的消息id
 */
export async function deleteMessage(messageId: string) {
    const [err] = await fetch('deleteMessage', { messageId });
    return !err;
}

/**
 * 获取目标群组的在线用户列表
 * @param groupId 目标群id
 */
export const getGroupOnlineMembers = (() => {
    let cache: {
        groupId: string;
        key: string;
        members: GroupMember[];
    } = {
        groupId: '',
        key: '',
        members: [],
    };
    return async function _getGroupOnlineMembers(
        groupId: string,
    ): Promise<GroupMember[]> {
        const [, result] = await fetch('getGroupOnlineMembersV2', {
            groupId,
            cache: cache.groupId === groupId ? cache.key : undefined,
        });
        if (!result) {
            return [];
        }

        if (result.cache === cache.key) {
            return cache.members as GroupMember[];
        }
        cache = {
            groupId,
            key: result.cache,
            members: result.members,
        };
        return result.members;
    };
})();

/**
 * 获取默认群组的在线用户列表
 */
export async function getDefaultGroupOnlineMembers() {
    const [, members] = await fetch('getDefaultGroupOnlineMembers');
    return members;
}

/**
 * 封禁用户
 * @param username 目标用户名
 */
export async function sealUser(username: string) {
    const [err] = await fetch('sealUser', { username });
    return !err;
}

/**
 * 封禁ip
 * @param ip ip地址
 */
export async function sealIp(ip: string) {
    const [err] = await fetch('sealIp', { ip });
    return !err;
}

/**
 * 封禁用户所有在线ip
 * @param userId 用户id
 */
export async function sealUserOnlineIp(userId: string) {
    const [err] = await fetch('sealUserOnlineIp', { userId });
    return !err;
}

/**
 * 获取封禁用户列表
 */
export async function getSealList() {
    const [, sealList] = await fetch('getSealList');
    return sealList;
}

export async function getSystemConfig() {
    const [, systemConfig] = await fetch('getSystemConfig');
    return systemConfig;
}

/**
 * 重置指定用户的密码
 * @param username 目标用户名
 */
export async function resetUserPassword(username: string) {
    const [, res] = await fetch('resetUserPassword', { username });
    return res;
}

/**
 * 更新指定用户的标签
 * @param username 目标用户名
 * @param tag 标签
 */
export async function setUserTag(username: string, tag: string) {
    const [err] = await fetch('setUserTag', { username, tag });
    return !err;
}

/**
 * 获取在线用户 ip
 * @param userId 用户id
 */
export async function getUserIps(userId: string) {
    const [, res] = await fetch('getUserIps', { userId });
    return res;
}

export async function getUserOnlineStatus(userId: string) {
    const [, res] = await fetch('getUserOnlineStatus', { userId });
    return res && res.isOnline;
}

export async function updateHistory(linkmanId: string, messageId: string) {
    const [, result] = await fetch('updateHistory', { linkmanId, messageId });
    return !!result;
}

export async function toggleSendMessage(enable: boolean) {
    const [, result] = await fetch('toggleSendMessage', { enable });
    return !!result;
}

export async function toggleNewUserSendMessage(enable: boolean) {
    const [, result] = await fetch('toggleNewUserSendMessage', { enable });
    return !!result;
}
