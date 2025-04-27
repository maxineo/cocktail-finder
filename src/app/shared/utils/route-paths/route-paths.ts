import { buildRoutePaths } from './build-route-paths';

/** Cocktail ID route param. */
export const COCKTAIL_ID_PARAM = 'cocktailId';

/** Route paths. */
export const routePaths = buildRoutePaths({
	home: {
		path: '',
	},
	cocktails: {
		path: 'cocktails',
		children: {
			details: { path: `:${COCKTAIL_ID_PARAM}` },
		},
	},
} as const);
