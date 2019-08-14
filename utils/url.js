module.exports = {
    addParam(url, params) {
        let result = url;
        Object.keys(params).forEach((key) => {
            if (result.indexOf('?') === -1) {
                result += `?${key}=${params[key]}`;
            } else {
                result += `&${key}=${params[key]}`;
            }
        });
        return result;
    },
};
