import path from 'node:path';

import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import { configs, plugins, rules } from 'eslint-config-airbnb-extended';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

const gitignorePath = path.resolve('.', '.gitignore');

const sharedLanguageOptions = {
  globals: {
    ...globals.browser,
  },
  ecmaVersion: 'latest',
  sourceType: 'module',
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const jsConfig = defineConfig([
  {
    name: 'js/config',
    ...js.configs.recommended,
    languageOptions: sharedLanguageOptions,
  },
  plugins.stylistic,
  plugins.importX,
  ...configs.base.recommended,
  rules.base.importsStrict,
]);

const reactConfig = defineConfig([
  plugins.react,
  plugins.reactHooks,
  plugins.reactA11y,
  ...configs.react.recommended,
  rules.react.strict,
]);

export default defineConfig([
  includeIgnoreFile(gitignorePath),
  ...jsConfig,
  ...reactConfig,
  {
    name: 'custom/settings-and-rules',
    plugins: {
      'react-refresh': reactRefresh,
    },
    languageOptions: sharedLanguageOptions,
    settings: {
      'import-x/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.json'],
        },
      },
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // 允許在元件檔案中額外 export 常數（例如：export const WIKI_URL = '...'）
      ],
      'import-x/no-unresolved': 'error',
      'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
      'jsx-a11y/label-has-associated-control': ['error', {
        required: {
          some: ['nesting', 'id'],
        },
      }],
      'react/function-component-definition': ['error', {
        namedComponents: ['function-declaration', 'arrow-function'],
        unnamedComponents: 'arrow-function',
      }],
    },
  },
]);
