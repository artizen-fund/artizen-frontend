module.exports = {
  plugins: ['@typescript-eslint', 'module-resolver'],
  parser: '@typescript-eslint/parser',
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    // Add "prettier" last. This will turn off eslint rules conflicting with prettier. This is not what will format our code.
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-max-props-per-line': [2, { maximum: 5 }],
    'module-resolver/use-alias': 2,
  },
  overrides: [
    {
      // or whatever matches stories specified in .storybook/main.js
      files: ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
      rules: {
        // example of overriding a rule
        'storybook/hierarchy-separator': 'error',
        // example of disabling a rule
        'storybook/default-exports': 'off',
        'max-len': 0,
      },
    },
  ],
}
