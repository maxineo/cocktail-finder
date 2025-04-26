import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Cocktail } from '../models/cocktail';
import { cocktailsResponseDtoSchema } from '../dtos/cocktails-response.dto';
import { CocktailMapper } from '../mappers/cocktail.mapper';

import { AppUrlsConfig } from './app-urls.config';

/** Cocktails api service. */
@Injectable({ providedIn: 'root' })
export class CocktailApiService {

	private readonly http = inject(HttpClient);

	private readonly appUrlsConfig = inject(AppUrlsConfig);

	private readonly cocktailMapper = inject(CocktailMapper);

	/**
	 * Gets list of cocktails by name.
	 * @param name Cocktail name.
	 */
	public getByName(name: string): Observable<Cocktail[]> {
		return this.http.get<unknown>(this.appUrlsConfig.cocktails.listByName(name)).pipe(
			map(response => cocktailsResponseDtoSchema.parse(response)),
			map(response => response.drinks),
			map(drinks => Array.isArray(drinks) ? drinks.map(drink => this.cocktailMapper.fromDto(drink)) : []),
		);
	}
}
