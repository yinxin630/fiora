module.exports = {
    roots: ['./test'],
    preset: 'ts-jest',
    transform: {
        '\\.(less|jpg)$': '<rootDir>/jest.transformer.js',
    },
    collectCoverage: true,
    globals: {
        'ts-jest': {
            isolatedModules: true,
        },
    },
};
