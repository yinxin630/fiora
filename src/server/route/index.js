const router = {
    handle: function (data, cb) {
        let end = (status, data) => cb({ status, data });
        let path = data.method + ' ' + data.path;
        if (this[path]) {
            this[path](data.data, end);
        }
        else {
            end(400, { msg: 'interface not exits' });
        }
    }
}

module.exports = router;