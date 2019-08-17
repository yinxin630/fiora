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
