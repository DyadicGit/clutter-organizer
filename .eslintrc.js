module.exports = {
  root: true,
  rules: {
    semi: "off",
    'comma-dangle': "off",
    'react-native/no-inline-styles':"off",
    'function-paren-newline': "off",
    'arrow-parens': "off",
    'max-len': "warn",
    'max-statements-per-line': "warn",
    curly: "off",
  },
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
};
