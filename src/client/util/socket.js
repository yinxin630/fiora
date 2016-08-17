function createInterface(method) {
    return function(path, data, cb) {
        if (this.token !== '') {
            data.token = token;
        }
        this.socket.emit('message', { method: method, path: path, data: data }, cb);
    };
}

function Socket(socket) {
    this.socket = socket;
    this.token = '';
    this.get = createInterface('GET').bind(this);
    this.post = createInterface('POST').bind(this);
    this.put = createInterface('PUT').bind(this);
    this.delete = createInterface('DELETE').bind(this);
    this.setToken = function (token) {
        this.token = token;
    }
}

export default Socket;
