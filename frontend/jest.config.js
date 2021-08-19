module.exports = {
    rootDir: ".",
    verbose: true,
    collectCoverage: true,
    preset: "ts-jest",
    setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect"
    ],
    moduleNameMapper: {
        "@components(.*)": "<rootDir>/src/components/$1",
        "@services(.*)": "<rootDir>/src/services/$1",
        "@redux(.*)": "<rootDir>/src/app/$1"
    }
}