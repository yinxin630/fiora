interface UrlParams {
    [key: string]: string;
}

// eslint-disable-next-line import/prefer-default-export
export function addParam(url: string, params: UrlParams) {
    let result = url;
    Object.keys(params).forEach((key) => {
        if (result.indexOf('?') === -1) {
            result += `?${key}=${params[key]}`;
        } else {
            result += `&${key}=${params[key]}`;
        }
    });
    return result;
}
