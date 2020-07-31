import { Context } from 'koa';
import { Socket } from 'net';
import { Schema } from 'mongoose';

interface KoaSocket extends Socket {
    /** socket id */
    id: string;
    /** socket关联用户 */
    user: Schema.Types.ObjectId;
    /** 用户ip */
    ip: string;
    /**
     * 加入房间
     * @param roomId 目标房间id
     */
    join: (roomId: string) => void;
    /**
     * 离开房间
     * @param roomId 目标房间id
     */
    leave: (roomId: string) => void;
    /**
     * 向目标房间做某些操作
     * @param roomId 目标房间id
     */
    to: (roomId: string) => {
        /**
         * 广播事件
         * @param event 事件名
         * @param data 数据
         */
        emit: (event: string, data: any) => void;
    }
}

// @ts-ignore
export interface KoaContext<T = any> extends Context {
    /** 接口入参 */
    data: T;
    /** socket实例 */
    socket: KoaSocket;
    /** 响应内容 */
    res: any;
    acknowledge: (data: any) => void;
}

export interface KoaRoutes {
    [event: string]: (ctx: any) => any;
}
