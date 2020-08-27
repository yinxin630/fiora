jest.mock('linaria', () => ({
    css: jest.fn(() => ''),
}));

jest.mock('command-line-args', () => () => ({}));
