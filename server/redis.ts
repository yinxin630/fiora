import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient();

export const get = promisify(client.get).bind(client);

export const set = promisify(client.set).bind(client);

export const expire = promisify(client.expire).bind(client);

export const keys = promisify(client.keys).bind(client);

export async function has(key: string) {
    const v = await get(key);
    return v !== null;
}

export function getNewUserKey(userId: string) {
    return `NewUser-${userId}`;
}

export function getNewRegisteredUserIpKey(ip: string) {
    return `NewRegisteredUserIp-${ip}`;
}

export function getSealIpKey(ip: string) {
    return `SealIp-${ip}`;
}

export async function getAllSealIp() {
    const allSealIpKeys = await keys('SealIp-*');
    return allSealIpKeys.map((key) => key.split('-')[1]);
}

const Hour = 60 * 60;
const Day = Hour * 24;

export const Redis = {
    get,
    set,
    has,
    expire,
    keys,
    Hour,
    Day,
};
