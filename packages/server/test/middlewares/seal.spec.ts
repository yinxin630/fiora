import { mocked } from 'ts-jest/utils';
import seal from '../../src/middlewares/seal';
import { SEAL_TEXT } from '@fiora/utils/const';
import { Redis } from '../../src/database/redis';
import { getMiddlewareParams } from '../helpers/middleware';
import { Socket } from 'socket.io';

jest.mock('../../../server/redis');

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
