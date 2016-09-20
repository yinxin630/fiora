import socketClient from 'socket.io-client';
import config from '../../config/config';

function createInterface(method) {
    return function (path, data, cb) {
        if (this.token !== '') {
            data.token = this.token;
        }
        this.emit('message', { method: method, path: path, data: data }, cb);
    };
}

function setToken(newToken) {
    this.token = newToken;
}

function socketWrap(socket) {
    socket.token = '';
    socket.get = createInterface('GET');
    socket.post = createInterface('POST');
    socket.put = createInterface('PUT');
    socket.delete = createInterface('DELETE');
    socket.setToken = setToken;
    return socket;
}

const serverUrl = `http://${process.env.NODE_ENV === 'production' ? config.server : 'fiora.suisuijiang.com'}:${80}/`;
export default socketWrap(socketClient(serverUrl));
