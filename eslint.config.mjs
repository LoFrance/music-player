import globals from 'globals'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import { fixupPluginRules } from '@eslint/compat'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,

  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: [
      '!node_modules/', // unignore `node_modules/` directory
      'node_modules/*', // ignore its content
      '!node_modules/mylibrary/', // unignore `node_modules/mylibrary` directory
    ],
  },
  {
    languageOptions: {
      parserOptions: { ecmaFeatures: { tsx: true, tseslint: true } },
      globals: { ...globals.browser },
    },
  },
  {
    plugins: {
      react: eslintPluginReact,
      'react-hooks': fixupPluginRules(eslintPluginReactHooks),
    },
  },
  {
    rules: {
      // ...
      ...eslintPluginReactHooks.configs.recommended.rules,
    },
  },
)
