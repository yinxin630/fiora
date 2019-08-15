import Message from '../client/components/Message';
import socket from '../client/socket';

const { SealText, SealTimeout } = require('./const');

/** 用户是否被封禁 */
let isSeal = false;

export default function fetch(event, data = {}, {
    toast = true,
} = {}) {
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
