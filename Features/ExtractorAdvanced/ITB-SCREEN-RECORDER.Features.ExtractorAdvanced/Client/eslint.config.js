// ==========================================
// File: Features/ExtractorAdvanced/Client/eslint.config.js
// ==========================================
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
    {
        ignores: ['dist', 'node_modules']
    },
    js.configs.recommended,
    {
        files: ['**/*.{js,jsx}'],
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                performance: 'readonly',
                requestAnimationFrame: 'readonly',
                cancelAnimationFrame: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                fetch: 'readonly',
                console: 'readonly',
                alert: 'readonly',
                confirm: 'readonly',
                sessionStorage: 'readonly',
                localStorage: 'readonly',
                URL: 'readonly',
                URLSearchParams: 'readonly',
                AbortController: 'readonly',
                CustomEvent: 'readonly',
                ResizeObserver: 'readonly'
            },
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        },
        rules: {
            // Standard core React Hooks rules
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // Disable React Compiler rules that are incompatible with custom stores and effects
            'react-hooks/set-state-in-effect': 'off',
            'react-hooks/refs': 'off',
            'react-hooks/purity': 'off',
            'react-hooks/preserve-manual-memoization': 'off',
            'react-hooks/immutability': 'off',

            // Ignore unused React import (React 17+ JSX Transform) and variables prefixed with underscore (_)
            'no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^React$|^_',
                    ignoreRestSiblings: true
                }
            ],
            'no-empty': ['warn', { allowEmptyCatch: true }],
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        },
    },
];