import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import parser from '@typescript-eslint/parser';
import eslintPluginTypeScript from '@typescript-eslint/eslint-plugin';

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules/**', 'build/**', 'dist/**', '*.min.js', 'coverage/**'],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': eslintPluginTypeScript,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@/semi': ['error', 'always'],
      '@/quotes': ['error', 'single'],
      '@/explicit-function-return-type': 'off',
      '@/explicit-module-boundary-types': 'off',
      '@/restrict-template-expressions': 'off',
      '@/restrict-plus-operands': 'off',
      '@/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'no-case-declarations': 'off',
      indent: ['error', 2], 
      'linebreak-style': ['error', 'windows'],
    },
    settings: {
      env: {
        node: true,
        es6: true,
      },
    },
  },
);

