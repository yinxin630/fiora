import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient();

export const Redis = {
    get: promisify(client.get).bind(client),
    set: promisify(client.set).bind(client),
    expire: promisify(client.expire).bind(client),
};

export default Redis;
