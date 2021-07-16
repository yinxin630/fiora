export function getMiddlewareParams(event = 'login', data = {}) {
    const cb = jest.fn();
    const next = jest.fn();

    return {
        args: [event, data, cb],
        cb,
        next,
    };
}
