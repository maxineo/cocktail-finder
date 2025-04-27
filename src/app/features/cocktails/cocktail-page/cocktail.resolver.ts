import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError, EMPTY, iif, map, Observable, throwError } from 'rxjs';
import { Cocktail } from 'src/app/core/models/cocktail';
import { CocktailsService } from 'src/app/core/services/cocktail-api.service';
import { COCKTAIL_ID_PARAM, routePaths } from 'src/app/shared/utils/route-paths/route-paths';

/** Cocktail page data. */
export type CocktailPageData = Readonly<{

	/** Config. */
	config: CocktailPageConfig;
}>;

/** Cocktail page configuration. */
export type CocktailPageConfig = Readonly<{

	/** Cocktail. */
	cocktail: Cocktail;
}>;

/** Cocktail page params. */
export type CocktailPageParams = {

	/** Cocktail's ID. */
	readonly [COCKTAIL_ID_PARAM]?: string;
};

/**
	* Cocktail resolver.
	* @param route Activated route snapshot.
 */
export function cocktailIdResolver(
	route: ActivatedRouteSnapshot,
): Observable<CocktailPageConfig> {
	const cocktailsService = inject(CocktailsService);
	const router = inject(Router);

	const id = Number((route.params as CocktailPageParams)[COCKTAIL_ID_PARAM]);

	return iif(
		() => id != null && !Number.isNaN(id),
		cocktailsService.getById(id).pipe(map(cocktail => ({ cocktail }))),
		throwError(() => new Error('Invalid cocktail ID value')),
	).pipe(
		catchError(() => {
			router.navigateByUrl(routePaths.home.path, { replaceUrl: true });
			return EMPTY;
		}),
	);
}
