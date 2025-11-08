/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    require.resolve('@spellix/eslint-config/client'),
    require.resolve('@spellix/eslint-config/prettier'),
    require.resolve('@spellix/eslint-config/typescript'),
  ],
  ignorePatterns: ['node_modules/', 'dist/'],
  overrides: [
    {
      files: [
        '*stories.ts',
        '*stories.tsx',
        '**/.storybook/*.ts',
        '**/.storybook/*.tsx',
        '*.cjs',
        '.*.js',
        '*.config.js',
        '*.config.ts',
      ],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-unassigned-import': 'off',
        'no-undefined': 'off',
        'no-magic-numbers': 'off',
        'no-alert': 'off',
      },
    },
    {
      files: ['src/components/**/*.tsx', 'src/components/**/*.ts'],
      rules: {
        'no-magic-numbers': 'off',
        'no-param-reassign': 'off',
        'no-bitwise': 'off',
        'consistent-return': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'off',
        'no-undefined': 'off',
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['**/theme/src/preset/**/*.ts', '**/theme/src/preset/**/*.tsx'],
      rules: {
        'no-undefined': 'off',
        'no-magic-numbers': 'off',
        'unicorn/no-useless-undefined': 'off',
        'sonarjs/no-nested-template-literal': 'off',
      },
    },
    {
      files: ['*.js', '*.cjs', '*.jsx', '*.tsx', '*.ts'],
      rules: {
        'eslint-comments/require-description': 'off',
        'import/order': [
          2,
          {
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
            pathGroups: [
              {
                pattern: 'react',
                group: 'builtin',
                position: 'before',
              },
              {
                pattern: 'react*',
                group: 'builtin',
              },
              {
                pattern: '@react*',
                group: 'builtin',
                position: 'after',
              },
              {
                pattern: '@spellix/**',
                group: 'external',
                position: 'after',
              },
              {
                pattern: '*.sass',
                group: 'index',
                position: 'after',
              },
            ],
            pathGroupsExcludedImportTypes: ['react', '@spellix'],
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
          },
        ],
      },
    },
  ],
};
