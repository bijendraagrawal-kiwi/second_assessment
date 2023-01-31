module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 0,
    'import/no-extraneous-dependencies': 0,
    'new-cap': 0,
    'no-underscore-dangle': 0,
  },
};
