const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['eslint:recommended', 'prettier', 'eslint-config-turbo'],
  globals: {
    React: true,
    JSX: true
  },
  env: {
    node: true
  },
  settings: {
    'import/resolver': {
      typescript: {
        project
      }
    }
  },
  ignorePatterns: [
    // Ignore dotfiles
    '**.js',
    'node_modules/',
    'dist/',
    'tsconfig.json',
    'jest.config.js',
    '**.test.ts'
  ],
  overrides: [
    {
      files: ['*.js?(x)', '*.ts?(x)']
    },
    {
      files: ['tests/**/*'],
      env: {
        jest: true
      }
    }
  ],
  rules: {
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_'
      }
    ]
  }
}
