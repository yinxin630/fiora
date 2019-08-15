import { Context } from 'koa';
import { Socket } from 'net';
import { Schema } from 'mongoose';

interface KoaSocket extends Socket {
    id: string;
    user?: Schema.Types.ObjectId;
}

// @ts-ignore
export interface KoaContext extends Context {
    socket: KoaSocket;
    res: string;
}

export interface KoaRoutes {
    [event: string]: (ctx: any) => any;
}
