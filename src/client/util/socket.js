function createInterface(method) {
    return function(path, data, cb) {
        if (this.token !== '') {
            data.token = this.token;
        }
        this.socket.emit('message', { method: method, path: path, data: data }, cb);
    };
}

function setToken(newToken) {
    this.token = newToken;
}

function Socket(socket) {
    this.socket = socket;
    this.token = '';
    this.get = createInterface('GET');
    this.post = createInterface('POST');
    this.put = createInterface('PUT');
    this.delete = createInterface('DELETE');
    this.setToken = setToken;
}

export default Socket;
