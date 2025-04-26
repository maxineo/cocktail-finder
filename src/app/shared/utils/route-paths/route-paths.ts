import { buildRoutePaths } from './build-route-paths';

/** Route paths. */
export const routePaths = buildRoutePaths({
	home: {
		path: '',
	},
} as const);
