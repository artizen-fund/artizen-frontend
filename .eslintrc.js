module.exports = {
  plugins: ['@typescript-eslint', 'module-resolver', 'import'],
  parser: '@typescript-eslint/parser',
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    // Add "prettier" last. This will turn off eslint rules conflicting with prettier. This is not what will format our code.
    'prettier',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  rules: {
    /* references */
    'prefer-const': 'error',
    'no-var': 'error',

    /* objects */
    'no-new-object': 'error',
    'object-shorthand': ['error', 'always', { avoidQuotes: true }],
    'quote-props': ['error', 'as-needed'],

    /* arrays */
    'no-array-constructor': 'error',
    'array-callback-return': ['error'],

    /* destructuring */
    'prefer-destructuring': ['error', { object: true, array: false }],

    /* strings */
    quotes: ['error', 'single'],
    'max-len': [
      'error',
      {
        code: 120,
        tabWidth: 2,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'prefer-template': 'error',
    'template-curly-spacing': ['error', 'never'],
    'no-eval': 'error',

    /* functions */
    'no-loop-func': 'error',
    'id-denylist': ['error', 'arguments'],
    'prefer-rest-params': 'error',
    'default-param-last': ['error'],
    'space-before-function-paren': 'error',
    'space-before-blocks': 'error',
    'no-param-reassign': 'error',

    /* arrow functions */
    'prefer-arrow-callback': 'error',
    'arrow-spacing': 'error',
    'arrow-parens': ['error', 'as-needed'],
    'implicit-arrow-linebreak': ['error', 'beside'],

    /* modules */
    'no-duplicate-imports': 'error',
    'object-curly-newline': ['error', { multiline: true }],
    'import/no-unresolved': 'error',

    /* iterators and generators */
    'no-iterator': 'error',

    /* variables */
    'one-var': ['error', 'never'],
    'no-multi-assign': 'error',
    'operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],

    /* comparison operators */
    eqeqeq: ['error', 'always'],

    /* blocks */
    'nonblock-statement-body-position': ['error', 'beside'],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],

    /* whitespace */
    'comma-style': ['error', 'last'],
    'comma-dangle': ['error', 'always-multiline'],

    /* semicolons */
    semi: ['error', 'never'],

    /* naming-conventions */
    'id-length': 'error',
    camelcase: 'error',
    'no-underscore-dangle': 'error',

    '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-max-props-per-line': [2, { maximum: 5 }],
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

  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
    },
  },
}
