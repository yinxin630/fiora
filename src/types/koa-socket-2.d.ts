// 声明来源: https://github.com/ambelovsky/koa-socket-2/issues/16

declare module 'koa-socket-2' {
    import { ServerOptions as HttpsServerOptions } from 'https';
    import Application from 'koa';
    import { RouterContext } from 'koa-router';
    import { ServerOptions as SocketioServerOptions } from 'socket.io';

    interface IOptions {
        namespace?: string;
        hidden?: boolean;
        ioOptions?: SocketioServerOptions;
    }

    type IEventHandler = (ctx: RouterContext) => any;

    class IO {
        public opts: IOptions;
        public connections: Map<string, any>;
        // tslint:disable-next-line:variable-name
        private _io: any;
        private middleware: any[];
        private composed: any;
        private listeners: Map<string, any>;
        private socket: any;

        constructor(opts: undefined | string | IOptions);
        public attach(app: Application, https?: boolean, opts?: HttpsServerOptions): void;
        public attachNamespace(app: Application, id: string): void;
        public use(fn: any): this;
        public on(event: string, handler: IEventHandler): this;
        public off(event: string, handler: IEventHandler): this;
        public broadcast(event: string, data: any): void;
        public to(room: string): object;
        private onConnection(sock: any): void;
        private onDisconnect(sock: any): void;
        private updateConnections(): void;
    }

    export = IO;
}
