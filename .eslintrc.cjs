module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [
    'react-refresh',
    'react',
    'import',
    'simple-import-sort',
    'unused-imports',
    'prettier',
  ],
  rules: {
    semi: ['error', 'never'],
    'prefer-const': ['warn'],
    'prefer-destructuring': ['error', { object: true, array: false }],
    'no-use-before-define': 'off',
    'no-unused-expressions': ['warn'],
    'no-shadow': 'off',
    'arrow-body-style': 2,
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [
      'warn',
      { namedComponents: 'arrow-function' },
    ],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'warn',
    'react/jsx-no-useless-fragment': 'error',
    'react/require-default-props': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        shorthandFirst: true,
        shorthandLast: true,
      },
    ],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'react/prop-types': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/prefer-default-export': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'unused-imports/no-unused-imports': 'error',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelAttributes: ['htmlFor'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
      },
    ],
  },
}
