const router = {
    handle: function (socket, data, cb) {
        let end = (status, data) => cb({ status, data });
        let path = data.method + ' ' + data.path;
        if (this[path]) {
            this[path](socket, data.data, end);
        }
        else {
            end(404, { msg: 'interface not exits' });
        }
    }
}

module.exports = router;