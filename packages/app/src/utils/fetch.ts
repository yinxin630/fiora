import Toast from '../components/Toast';
import socket from '../socket';

export default function fetch<T = any>(
    event: string,
    data: any = {},
    { toast = true } = {},
): Promise<[string | null, T | null]> {
    return new Promise((resolve) => {
        socket.emit(event, data, (res: any) => {
            if (typeof res === 'string') {
                if (toast) {
                    Toast.danger(res);
                }
                resolve([res, null]);
            } else {
                resolve([null, res]);
            }
        });
    });
}
