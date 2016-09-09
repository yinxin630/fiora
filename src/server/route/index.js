const router = {
    handle: function (io, socket, receiveData, cb) {
        if (!(cb instanceof Function)) {
            cb = console.log;
        }
        const end = (status, data) => cb({ status, data });
        const path = `${receiveData.method} ${receiveData.path}`;
        if (this[path]) {
            this[path].call(
                {
                    io,
                    socket,
                    end,
                },
                receiveData.data
            );
        }
        else {
            end(404, 'interface not exits');
        }
    },
};

module.exports = router;
