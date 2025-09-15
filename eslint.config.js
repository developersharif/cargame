import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import tsParser from '@typescript-eslint/parser';

export default [
  // Ignore build artifacts and deps
  { ignores: ['build/**', 'dist/**', 'node_modules/**'] },

  // Base JS rules
  js.configs.recommended,

  // Svelte recommended (handles <script/lang="ts"> inside .svelte)
  ...svelte.configs['flat/recommended'],

  // TypeScript files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: false // keep simple & fast; no type-aware rules
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        performance: 'readonly',
        requestAnimationFrame: 'readonly',
        devicePixelRatio: 'readonly',
        KeyboardEvent: 'readonly',
        HTMLElement: 'readonly',
        CanvasRenderingContext2D: 'readonly',
        WebSocket: 'readonly',
        setTimeout: 'readonly',
        // Node / config
        process: 'readonly',
        console: 'readonly'
      }
    },
    rules: {}
  }
];
