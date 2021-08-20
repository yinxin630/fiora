import config from '@fiora/config/app';

export const referer = config.server + (config.server.endsWith('/') ? '' : '/');
