module.exports = {
    roots: ['./test'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '\\.(less|jpg)$': '<rootDir>/jest.transformer.js',
    },
    collectCoverage: true,
};
