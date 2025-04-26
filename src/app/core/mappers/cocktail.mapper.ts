import { Injectable } from '@angular/core';

import { CocktailDto } from '../dtos/cocktail.dto';
import { Cocktail } from '../models/cocktail';

import { MapperFromDto } from './mappers';

/** Cocktail mapper. */
@Injectable({ providedIn: 'root' })
export class CocktailMapper implements MapperFromDto<CocktailDto, Cocktail> {

	/** @inheritdoc */
	public fromDto(dto: CocktailDto): Cocktail {

		const ingredients: Cocktail['ingredients'][number][] = [];
		for (const [key, value] of Object.entries(dto)) {
			if (key.startsWith('strIngredient') && value !== null) {
				ingredients.push(value);
			}
		}
		return {
			id: parseInt(dto.idDrink, 10),
			name: dto.strDrink,
			glassType: dto.strGlass,
			imageUrl: dto.strDrinkThumb,
			instruction: dto.strInstructions,
			ingredients,
		};
	}
}
