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
        __TEST__: true,
    },
    setupFilesAfterEnv: ['./jest.setup.js'],
    collectCoverageFrom: [
        '**/*.{ts,tsx}',
        '!**/node_modules/**',
        '!**/config/**',
    ],
};
