import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Cocktail } from 'src/app/core/models/cocktail';
import { IonList, IonItem } from '@ionic/angular/standalone';
import { CocktailCardComponent } from 'src/app/shared/components/cocktail-card/cocktail-card.component';
import { routePaths } from 'src/app/shared/utils/route-paths/route-paths';
import { RouterModule } from '@angular/router';

/** Cocktails list component. */
@Component({
	selector: 'cf-cocktails-list',
	templateUrl: './cocktails-list.component.html',
	styleUrl: './cocktails-list.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		IonList,
		IonItem,
		CocktailCardComponent,
		RouterModule,
	],
})
export class CocktailsListComponent {

	/** Cocktails. */
	public readonly cocktails = input.required<Cocktail[]>();

	/**
	 * Gets URL for cocktail details page.
	 * @param cocktail Cocktail.
	 */
	protected getCocktailDetailsUrl(cocktail: Cocktail): string {
		return 	routePaths.cocktails.children.details.url({ cocktailId: cocktail.id });
	}

}
