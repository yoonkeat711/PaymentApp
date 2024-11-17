module.exports = {
    root: true,
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-native/all',
      'plugin:prettier/recommended',
    ],
    parser: 'babel-eslint',
    env: {
      'react-native/react-native': true,
      node: true,
      browser: true,
    },
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      // Customize your rules here, for example:
      'react/prop-types': 'off', // Disable prop-types if you're using TypeScript
      'prettier/prettier': ['error', { singleQuote: true, semi: false }],
      'no-unused-vars': ['warn'],
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the react version
      },
    },
  };