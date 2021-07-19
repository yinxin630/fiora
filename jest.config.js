module.exports = {
    preset: 'ts-jest',
    moduleNameMapper: {
        '^.+\\.(css|less|jpg|png|gif|mp3)$': '<rootDir>/jest.transformer.js',
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
