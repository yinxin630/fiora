import Message from '../client2/components/Message';
import socket from '../client2/socket';

import { SealText, SealTimeout } from './const';

/** 用户是否被封禁 */
let isSeal = false;

export default function fetch<T = any>(event: string, data = {}, {
    toast = true,
} = {}): Promise<[string, T]> {
    if (isSeal) {
        Message.error(SealText);
        return Promise.resolve([SealText, null]);
    }
    return new Promise((resolve) => {
        socket.emit(event, data, (res) => {
            if (typeof res === 'string') {
                if (toast) {
                    Message.error(res);
                }
                if (res === SealText) {
                    isSeal = true;
                    setTimeout(() => { isSeal = false; }, SealTimeout);
                }
                resolve([res, null]);
            } else {
                resolve([null, res]);
            }
        });
    });
}
