import isLogin, { PLEASE_LOGIN } from '../../../server/middlewares/isLogin';
import { Socket } from '../../../types/socket';
import { getMiddlewareParams } from '../../helpers/middleware';

describe('server/middlewares/isLogin', () => {
    it('should call service fail when user not login', async () => {
        const socket = {
            id: 'id',
            data: {},
        } as Socket;
        const middleware = isLogin(socket);

        const { args, cb, next } = getMiddlewareParams('sendMessage');

        await middleware(args, next);
        expect(cb).toBeCalledWith(PLEASE_LOGIN);
    });

    it('should call service success when user is login', async () => {
        const socket = {
            id: 'id',
            data: {
                user: 'user',
            },
        } as Socket;
        const middleware = isLogin(socket);

        const { args, next } = getMiddlewareParams('sendMessage');

        await middleware(args, next);
        expect(next).toBeCalled();
    });

    it('should call service success when it not need login ', async () => {
        const socket = {
            id: 'id',
            data: {
                user: 'user',
            },
        } as Socket;
        const middleware = isLogin(socket);

        const { args, next } = getMiddlewareParams('register');

        await middleware(args, next);
        expect(next).toBeCalled();
    });
});
