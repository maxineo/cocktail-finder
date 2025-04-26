import { Routes } from '@angular/router';

import { homeRoutes } from './features/home/home.routes';

/** App routes. */
export const routes: Routes = [
	...homeRoutes,
	{
		path: '**',
		redirectTo: '',
	},
];
