module.exports = {
    roots: ['./test'],
    preset: 'ts-jest',
    transform: {
        '\\.(mp3)$': '<rootDir>/jest.transformer.js',
    },
    moduleNameMapper: {
        '.+\\.(css|less|png|jpg|gif)$': 'identity-obj-proxy',
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
        '!**/test/helpers/**',
    ],
};
