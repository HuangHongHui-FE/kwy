module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-multiple-empty-lines': process.env.NODE_ENV === 'production' ? 'warn': 'off',
    'no-trailing-spaces': process.env.NODE_ENV === 'production' ? 'warn': 'off',
    'indent': process.env.NODE_ENV === 'production' ? 'warn': 'off',
    'keyword-spacing': process.env.NODE_ENV === 'production' ? 'warn': 'off',
    'object-curly-spacing': process.env.NODE_ENV === 'production' ? 'warn': 'off',
    'eol-last': process.env.NODE_ENV === 'production' ? 'warn': 'off',
    'no-tabs': process.env.NODE_ENV === 'production' ? 'warn': 'off',
    'space-before-function-paren': process.env.NODE_ENV === 'production' ? 'warn': 'off',
    'space-before-blocks': process.env.NODE_ENV === 'production' ? 'warn': 'off',
    'key-spacing': process.env.NODE_ENV === 'production' ? 'warn': 'off',
    'quotes': process.env.NODE_ENV === 'production' ? 'warn': 'off',
    'padded-blocks': process.env.NODE_ENV === 'production' ? 'warn': 'off',
    'no-mixed-spaces-and-tabs': process.env.NODE_ENV === 'production' ? 'warn': 'off',
    'semi': process.env.NODE_ENV === 'production' ? 'warn': 'off',
    'space-infix-ops': process.env.NODE_ENV === 'production' ? 'warn': 'off',
    'comma-spacing': process.env.NODE_ENV === 'production' ? 'warn': 'off',
    'prefer-const': process.env.NODE_ENV === 'production' ? 'warn': 'off',
    'spaced-comment': process.env.NODE_ENV === 'production' ? 'warn': 'off'

  }
}
