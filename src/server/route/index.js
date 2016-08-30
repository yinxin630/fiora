const router = {
    handle: function (socket, data, cb) {
        const end = (status, responesData) => cb({ status, responesData });
        const path = `${data.method} ${data.path}`;
        if (this[path]) {
            this[path](socket, data.data, end);
        }
        else {
            end(404, 'interface not exits');
        }
    },
};

module.exports = router;
