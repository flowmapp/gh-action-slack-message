module.exports = {
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    indent: ['error', 2],
    'max-len': ['error', { code: 100 }],
    'no-console': ['error', { allow: ['info'] }],
  },
}
