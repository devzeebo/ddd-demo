module.exports = {
  extends: [
    'plugin:@next/next/recommended',
    '@react-ddd',
  ],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [{
    files: '**/getServerSideProps.ts',
    rules: {
      'import/prefer-default-export': 'off',
    },
  }],
};
