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

export default socketWrap;
