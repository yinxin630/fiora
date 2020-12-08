jest.mock('linaria', () => ({
    css: jest.fn(() => ''),
}));

jest.mock('redis', () => jest.requireActual('redis-mock'));
