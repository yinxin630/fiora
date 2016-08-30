const router = {
    handle: function (socket, receiveData, cb) {
        const end = (status, data) => cb({ status, data });
        const path = `${receiveData.method} ${receiveData.path}`;
        if (this[path]) {
            this[path](socket, receiveData.data, end);
        }
        else {
            end(404, 'interface not exits');
        }
    },
};

module.exports = router;
