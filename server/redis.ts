import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient();

export const get = promisify(client.get).bind(client);

export const set = promisify(client.set).bind(client);

export const expire = promisify(client.expire).bind(client);

export const has = async function has(key: string) {
    const v = await get(key);
    return v !== null;
};

export function getNewUserKey(userId: string) {
    return `NewUser-${userId}`;
}

export function getNewRegisteredUserIpKey(ip: string) {
    return `NewRegisteredUserIp-${ip}`;
}

const OneDay = 60 * 60 * 24;

export const Redis = {
    get,
    set,
    has,
    expire,
    OneDay,
};
