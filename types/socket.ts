import { Socket as SocketIOScoket } from 'socket.io';

export interface Socket extends SocketIOScoket {
    user: string;
    isAdmin: boolean;
}
