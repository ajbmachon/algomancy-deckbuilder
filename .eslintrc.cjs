module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    jsx: true
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    // Disable prop-types warnings to simplify
    'react/prop-types': 'off',
    // Basic linting rules
    'no-unused-vars': 'warn',
    'no-undef': 'error',
    'no-console': 'warn'
  }
};
