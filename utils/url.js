module.exports = {
    addParam(url, params) {
        let result = url;
        for (const key in params) {
            if (result.indexOf('?') === -1) {
                result += `?${key}=${params[key]}`;
            } else {
                result += `&${key}=${params[key]}`;
            }
        }
        return result;
    },
};
