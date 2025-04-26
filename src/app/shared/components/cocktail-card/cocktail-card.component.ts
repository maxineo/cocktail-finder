import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Cocktail } from 'src/app/core/models/cocktail';

/** Cocktail card component. */
@Component({
	selector: 'cf-cocktail-card',
	templateUrl: './cocktail-card.component.html',
	styleUrl: './cocktail-card.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
})
export class CocktailCardComponent {

	/** Cocktail. */
	public readonly cocktail = input.required<Cocktail>();

}
