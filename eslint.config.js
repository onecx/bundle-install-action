import js from '@eslint/js';

export default [
  {
    ignores: ['dist/**']
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
      }
    }
  },
  {
    files: ['index.test.js'],
    languageOptions: {
      globals: {
        test: 'readonly'
      }
    }
  }
];
