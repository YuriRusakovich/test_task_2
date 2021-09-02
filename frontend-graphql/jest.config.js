module.exports = {
    rootDir: '.',
    verbose: true,
    collectCoverage: true,
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    moduleNameMapper: {
        '@components(.*)': '<rootDir>/src/components/$1',
        '@pages(.*)': '<rootDir>/src/pages/$1',
    },
};
