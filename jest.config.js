module.exports = {
    roots: ['./test'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '\\.(less)$': '<rootDir>/jest.transformer.js',
    },
    collectCoverage: true,
};
