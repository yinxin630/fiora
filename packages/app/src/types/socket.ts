export type Socket = {
    on: (event: string, callback: (...params: any) => void) => void;
};
