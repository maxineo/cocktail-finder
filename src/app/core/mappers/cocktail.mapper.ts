import { Injectable } from '@angular/core';

import { CocktailDto } from '../dtos/cocktail.dto';
import { Cocktail } from '../models/cocktail';

import { MapperFromDto } from './mappers';

const ingredientKeyPrefix = 'strIngredient';
const measureKeyPrefix = 'strMeasure';
const ingredientsMaxIndex = 15;

/** Cocktail mapper. */
@Injectable({ providedIn: 'root' })
export class CocktailMapper implements MapperFromDto<CocktailDto, Cocktail> {

	/** @inheritdoc */
	public fromDto(dto: CocktailDto): Cocktail {

		const ingredients: Cocktail['ingredients'][number][] = [];
		for (let i = 1; i <= ingredientsMaxIndex; i++) {
			// @ts-expect-error
			const ingredientName = dto[`${ingredientKeyPrefix}${i}`] as (string | undefined);

			// @ts-expect-error
			const measure = dto[`${measureKeyPrefix}${i}`] as (string | undefined);
			if (ingredientName != null && ingredientName !== '') {
				ingredients.push({
					name: ingredientName,
					measure: measure ?? null,
				});
			}
		}
		return {
			id: parseInt(dto.idDrink, 10),
			name: dto.strDrink,
			glassType: dto.strGlass,
			smallImageUrl: `${dto.strDrinkThumb}/small`,
			mediumImageUrl: `${dto.strDrinkThumb}/medium`,
			instruction: dto.strInstructions,
			ingredients,
		};
	}
}
