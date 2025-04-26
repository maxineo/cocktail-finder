import { z } from 'zod';

/** Cocktail DTO schema. */
export const cocktailDtoSchema = z.object({
	idDrink: z.string(),
	strDrink: z.string(),
	strGlass: z.string(),
	strDrinkThumb: z.string(),
	strIngredient1: z.string().nullable(),
	strIngredient2: z.string().nullable(),
	strIngredient3: z.string().nullable(),
	strIngredient4: z.string().nullable(),
	strIngredient5: z.string().nullable(),
	strIngredient6: z.string().nullable(),
	strIngredient7: z.string().nullable(),
	strIngredient8: z.string().nullable(),
	strIngredient9: z.string().nullable(),
	strIngredient10: z.string().nullable(),
	strIngredient11: z.string().nullable(),
	strIngredient12: z.string().nullable(),
	strIngredient13: z.string().nullable(),
	strIngredient14: z.string().nullable(),
	strIngredient15: z.string().nullable(),
	strInstructions: z.string(),
});

/** Cocktail DTO. */
export type CocktailDto = Readonly<z.infer<typeof cocktailDtoSchema>>;
