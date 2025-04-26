/** Cocktail. */
export type Cocktail = Readonly<{

	/** ID. */
	id: number;

	/** Name. */
	name: string;

	/** Type of glass. */
	glassType: string;

	/** Image URL. */
	imageUrl: string;

	/** Ingredients list. */
	ingredients: readonly string[];

	/** Cocktail making instructions. */
	instruction: string;
}>;
