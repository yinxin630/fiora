module.exports = function (result, end, status, data) {
    if (result) {
        end(status, data);
        throw new Error(`assert failed. ${data}`);
    }
};
