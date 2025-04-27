import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Cocktail } from 'src/app/core/models/cocktail';

/** Cocktail details. */
@Component({
	selector: 'cf-cocktail-details',
	templateUrl: './cocktail-details.component.html',
	styleUrl: './cocktail-details.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
})
export class CocktailDetailsComponent {

	/** Cocktail. */
	public readonly cocktail = input.required<Cocktail>();
}
