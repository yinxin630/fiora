import { mocked } from 'ts-jest/utils';
import { SEAL_TEXT } from '@fiora/utils/const';
import { Socket } from 'socket.io';
import { Redis } from '@fiora/database/redis/initRedis';
import seal from '../../src/middlewares/seal';
import { getMiddlewareParams } from '../helpers/middleware';

jest.mock('@fiora/database/redis/initRedis');

describe('server/middlewares/seal', () => {
    it('should call service success', async () => {
        const socket = {
            id: 'id',
            data: {
                user: 'user',
            },
            handshake: {
                headers: {
                    'x-real-ip': '127.0.0.1',
                },
            },
        } as unknown as Socket;
        const middleware = seal(socket);

        const { args, next } = getMiddlewareParams();

        await middleware(args, next);
        expect(next).toBeCalled();
    });

    it('should call service fail when user has been sealed', async () => {
        mocked(Redis.has).mockReturnValue(Promise.resolve(true));
        const socket = {
            id: 'id',
            data: {
                user: 'user',
            },
            handshake: {
                headers: {
                    'x-real-ip': '127.0.0.1',
                },
            },
        } as unknown as Socket;
        const middleware = seal(socket);

        const { args, cb, next } = getMiddlewareParams();

        await middleware(args, next);
        expect(cb).toBeCalledWith(SEAL_TEXT);
    });
});
