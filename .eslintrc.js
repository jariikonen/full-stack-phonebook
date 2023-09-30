module.exports = {
  env: {
    browser: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'no-console': 0,
    'no-alert': 0,
    'no-unused-vars': ['error', { args: 'none' }],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-shadow': 0,
    'no-plusplus': 0,
    'import/no-import-module-exports': 0,
  },
  extends: ['airbnb', 'plugin:jsx-a11y/recommended', 'prettier'],
  plugins: ['jsx-a11y', 'prettier'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@controllers', './server/controllers'],
          ['@middleware', './server/middleware'],
          ['@util', './server/util'],
          ['Utilities', './client/util'],
          ['Components', './client/components'],
          ['Assets', './client/assets'],
          ['@root', '.'],
        ],
      },
    },
  },
};
