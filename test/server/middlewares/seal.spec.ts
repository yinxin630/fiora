import { mocked } from 'ts-jest/utils';
import seal from '../../../server/middlewares/seal';
import { SealText } from '../../../utils/const';
import { Redis } from '../../../server/redis';
import { Socket } from '../../../types/socket';
import { getMiddlewareParams } from '../../helpers/middleware';

jest.mock('../../../server/redis');

describe('server/middlewares/seal', () => {
    it('should call service success', async () => {
        const socket = {
            id: 'id',
            user: 'user',
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
            user: 'user',
            handshake: {
                headers: {
                    'x-real-ip': '127.0.0.1',
                },
            },
        } as unknown as Socket;
        const middleware = seal(socket);

        const { args, cb, next } = getMiddlewareParams();

        await middleware(args, next);
        expect(cb).toBeCalledWith(SealText);
    });
});
