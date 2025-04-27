/** Cocktail. */
export type Cocktail = Readonly<{

	/** ID. */
	id: number;

	/** Name. */
	name: string;

	/** Type of glass. */
	glassType: string;

	/** Small image URL. */
	smallImageUrl: string;

	/** Medium image URL. */
	mediumImageUrl: string;

	/** Ingredients list. */
	ingredients: readonly string[];

	/** Cocktail making instructions. */
	instruction: string;
}>;
