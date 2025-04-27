import { Routes } from '@angular/router';

import { homeRoutes } from './features/home/home.routes';
import { cocktailsRoutes } from './features/cocktails/cocktails.routes';

/** App routes. */
export const routes: Routes = [
	...homeRoutes,
	...cocktailsRoutes,
];
