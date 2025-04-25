/* eslint-disable @typescript-eslint/naming-convention */
import { resolve } from 'node:path';

import { fixupPluginRules, includeIgnoreFile } from '@eslint/compat';

import { config as tsEslintConfig } from 'typescript-eslint';
import { configs as angularEslintConfigs } from 'angular-eslint';
import rxjs from 'eslint-plugin-rxjs';

import { default as commonEslintConfig } from './eslint-common.config.js';

export default tsEslintConfig(

	// We have to use explicit global ignore. Otherwise, ESLint will check all *.js files.
	// Those files are always matched unless you explicitly exclude them using global ignores.
	// https://eslint.org/docs/latest/use/configure/configuration-files#specifying-files-and-ignores
	includeIgnoreFile(resolve(import.meta.dirname, '.gitignore')),
	{
		files: ['**/*.ts', 'eslint.config.js'],
		languageOptions: {
			parserOptions: {
				projectService: {
					allowDefaultProject: ['eslint.config.js'],
				},
				tsconfigRootDir: import.meta.dirname,
			},
		},
		plugins: {
			rxjs: fixupPluginRules(rxjs),
		},
		extends: [...commonEslintConfig, ...angularEslintConfigs.tsRecommended],
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					vars: 'all',
					args: 'after-used',
					ignoreRestSiblings: false,
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			'no-tabs': 'off',
			'no-void': 'error',
			'@typescript-eslint/prefer-nullish-coalescing': [
				'error',
				{
					allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: true,
				},
			],
			'rxjs/no-ignored-replay-buffer': 'error',
			'rxjs/no-internal': 'error',
			'rxjs/no-nested-subscribe': 'error',
			'rxjs/throw-error': 'error',
			'rxjs/no-async-subscribe': 'error',
			'rxjs/no-create': 'error',
			'rxjs/no-ignored-observable': 'error',
			'rxjs/no-implicit-any-catch': 'error',
			'rxjs/no-index': 'error',
			'rxjs/no-sharereplay': [
				'error',
				{
					allowConfig: true,
				},
			],
			'rxjs/no-subclass': 'error',
			'rxjs/no-unsafe-takeuntil': [
				'error',
				{
					alias: ['takeUntilDestroyed'],
				},
			],
			'jsdoc/tag-lines': 'off',
			'@stylistic/indent': ['error', 'tab'],
			'prefer-destructuring': [
				'error', {
					AssignmentExpression: {
						array: false,
						object: false,
					},
				},
			],
		},
	},
	{
		files: ['src/**/*.html'],
		ignores: ['src/index.html'],
		extends: [...angularEslintConfigs.templateRecommended],
		rules: {
			'@angular-eslint/template/alt-text': 'error',
			'@angular-eslint/template/conditional-complexity': [
				'error',
				{
					maxComplexity: 2,
				},
			],
			'@angular-eslint/template/no-duplicate-attributes': 'error',
			'@angular-eslint/template/no-inline-styles': [
				'error',
				{
					allowNgStyle: true,
					allowBindToStyle: true,
				},
			],
			'@angular-eslint/template/no-interpolation-in-attributes': 'error',
			'@angular-eslint/template/no-positive-tabindex': 'error',
			'@angular-eslint/template/use-track-by-function': 'error',
		},
	},
	{
		files: ['**/*.dto.ts', '**/*.mapper.ts', '**/*-api.service.ts'],
		rules: {
			'no-restricted-syntax': [
				'error',
				{
					selector: 'TSPropertySignature[readonly=undefined]',
					message: 'Missing \'readonly\' modifier for the DTO property.',
				},
				{
					selector: 'TSPropertySignature TSTypeAnnotation[typeAnnotation.type=\'TSArrayType\']',
					message: 'Missing \'readonly\' type modifier for array.',
				},
			],
			'@typescript-eslint/naming-convention': 'off',
		},
	},
	{
		files: ['**/*.spec.ts'],
		rules: {
			'max-lines-per-function': 'off',
			'@typescript-eslint/naming-convention': 'off',
			'@angular-eslint/use-component-selector': 'off',
			'jsdoc/require-jsdoc': 'off',
			'@typescript-eslint/explicit-function-return-type': 'off',
		},
	},
	{
		files: ['src/**/*.ts'],
		rules: {
			'@angular-eslint/directive-selector': [
				'error',
				{
					type: 'attribute',
					prefix: 'cf',
					style: 'camelCase',
				},
			],
			'@angular-eslint/component-selector': [
				'error',
				{
					type: 'element',
					prefix: 'cf',
					style: 'kebab-case',
				},
			],
			'@angular-eslint/no-lifecycle-call': ['error'],
			'@angular-eslint/prefer-on-push-component-change-detection': ['error'],
			'@angular-eslint/prefer-output-readonly': ['error'],
		},
	},
);
