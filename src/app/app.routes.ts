import { Routes } from '@angular/router';

/** App routes. */
export const routes: Routes = [
	{
		path: 'home',
		loadComponent: () => import('./home/home.page').then(m => m.HomePageComponent),
	},
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
];
