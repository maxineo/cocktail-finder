import { z } from 'zod';

import { cocktailDtoSchema } from './cocktail.dto';

/** Cocktails response DTO schema. */
export const cocktailsResponseDtoSchema = z.object({
	drinks: z.union([z.array(cocktailDtoSchema), z.string()]).nullable(),
});
