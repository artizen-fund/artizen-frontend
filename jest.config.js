const tsconfig = require('./tsconfig.json')
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig)
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/cypress/integration/', '<rootDir>/tools/templates/'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      diagnostics: true,
    },
    NODE_ENV: 'test',
    window: undefined,
  },
  moduleNameMapper,
}

/* note: we need to not-compile uuid as the source uses non-ES exports.
 *  However, we cannot simply ass transformIgnorePatterns due to a known Next/Jest bug.
 *  https://github.com/vercel/next.js/issues/35634#issuecomment-1115250297
 */
async function jestConfig() {
  const nextJestConfig = await createJestConfig(customJestConfig)()
  nextJestConfig.transformIgnorePatterns[0] = '/node_modules/(?!uuid)/'
  return nextJestConfig
}

module.exports = jestConfig
