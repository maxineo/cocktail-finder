import { Route } from '@angular/router';
import { routePaths } from 'src/app/shared/utils/route-paths/route-paths';

import { cocktailIdResolver } from './cocktail-page/cocktail.resolver';

/** Cocktails routes. */
export const cocktailsRoutes: readonly Route[] = [
	{
		path: routePaths.cocktails.path,
		children: [
			{
				path: routePaths.cocktails.children.details.path,
				resolve: { config: cocktailIdResolver },
				loadComponent: () => import('./cocktail-page/cocktail-page.component')
					.then(c => c.CocktailDetailsPageComponent),
			},
		],
	},
];
