import fetch from '../utils/fetch';

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
