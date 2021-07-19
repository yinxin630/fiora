import { mocked } from 'ts-jest/utils';
import { Redis } from '@fiora/database/redis/initRedis';
import { Socket } from 'socket.io';
import frequency, {
    CALL_SERVICE_FREQUENTLY,
    NEW_USER_CALL_SERVICE_FREQUENTLY,
} from '../../src/middlewares/frequency';
import { getMiddlewareParams } from '../helpers/middleware';

jest.mock('@fiora/database/redis/initRedis');
jest.useFakeTimers();

describe('server/middlewares/frequency', () => {
    it('should response call service frequently', async () => {
        const socket = {
            id: 'id',
            data: {},
        } as Socket;
        const middleware = frequency(socket, {
            maxCallPerMinutes: 3,
        });

        const { args, cb, next } = getMiddlewareParams('sendMessage');

        await middleware(args, next);
        expect(next).toBeCalledTimes(1);

        await middleware(args, next);
        await middleware(args, next);
        await middleware(args, next);
        expect(cb).toBeCalledWith(CALL_SERVICE_FREQUENTLY);
    });

    it('should response success when event is not sendMessage', async () => {
        const socket = {
            id: 'id',
        } as Socket;
        const middleware = frequency(socket, {
            maxCallPerMinutes: 1,
        });

        const { args, next } = getMiddlewareParams('login');

        await middleware(args, next);
        await middleware(args, next);
        expect(next).toBeCalledTimes(2);
    });

    it('should stricter for new user', async () => {
        const socket = {
            id: 'id',
            data: {
                user: '1',
            },
        } as Socket;
        const middleware = frequency(socket, {
            maxCallPerMinutes: 3,
            newUserMaxCallPerMinutes: 1,
        });

        const { args, cb, next } = getMiddlewareParams('sendMessage');

        mocked(Redis.has).mockReturnValue(Promise.resolve(true));
        await middleware(args, next);
        await middleware(args, next);
        expect(cb).toBeCalledWith(NEW_USER_CALL_SERVICE_FREQUENTLY);
    });

    it('should clear count data regularly ', async () => {
        const socket = {
            id: 'id',
            data: {},
        } as Socket;
        const middleware = frequency(socket, {
            maxCallPerMinutes: 1,
            clearDataInterval: 1000,
        });

        const { args, cb, next } = getMiddlewareParams('sendMessage');

        await middleware(args, next);
        await middleware(args, next);
        expect(cb).toBeCalledWith(CALL_SERVICE_FREQUENTLY);

        jest.advanceTimersByTime(1000);
        await middleware(args, next);
        expect(next).toBeCalledTimes(2);
    });
});
