import { Route } from '@angular/router';
import { routePaths } from 'src/app/shared/route-paths/route-paths';

/** Home routes. */
export const homeRoutes: readonly Route[] = [
	{
		path: routePaths.home.path,
		loadComponent: () => import('./home-page/home-page.component').then(c => c.HomePageComponent),
	},
];
