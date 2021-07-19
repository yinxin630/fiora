jest.mock('./packages/web/node_modules/linaria', () => ({
    css: jest.fn(() => ''),
}));

jest.mock('./packages/database/node_modules/redis', () => jest.requireActual('redis-mock'));
