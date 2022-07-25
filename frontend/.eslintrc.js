const path = require('path');

module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    // requireConfigFile: false
    babelOptions: {
      configFile: path.resolve(__dirname, '.babelrc.js'),
    },
  },
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended', 'prettier'],
  plugins: ['@babel'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/valid-v-slot': 'off'
  },
  ignorePatterns: ['node_modules/**/**'],
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        mocha: true,
      },
    },
  ],
};
