import { existMemoryData, MemoryDataStorageKey } from '../memoryData';

/**
 * Refusing to seal user requests
 */
const { SealText } = require('../../utils/const');

module.exports = function seal() {
    return async (ctx, next) => {
        if (
            ctx.socket.user
            && existMemoryData(MemoryDataStorageKey.SealList, ctx.socket.user.toString())
        ) {
            ctx.res = SealText;
            return null;
        }

        return next();
    };
};
