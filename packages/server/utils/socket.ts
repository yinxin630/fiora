import { Socket } from '../../types/socket';

export function getSocketIp(socket: Socket) {
    return (
        (socket.handshake.headers['x-real-ip'] as string) ||
        socket.request.connection.remoteAddress ||
        ''
    );
}
