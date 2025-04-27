import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonToolbar, IonHeader, IonBackButton, IonButtons, IonTitle } from '@ionic/angular/standalone';

import { CocktailDetailsComponent } from '../cocktail-details/cocktail-details.component';

import { CocktailPageData } from './cocktail.resolver';

/** Cocktail page. */
@Component({
	selector: 'cf-cocktail-page',
	templateUrl: './cocktail-page.component.html',
	styleUrl: './cocktail-page.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		IonTitle,
		IonButtons,
		IonHeader,
		IonToolbar,
		IonContent,
		IonBackButton,
		CocktailDetailsComponent,
	],
})
export class CocktailDetailsPageComponent {

	private readonly route = inject(ActivatedRoute);

	private readonly pageConfig = (this.route.snapshot.data as CocktailPageData).config;

	/** Cocktail. */
	protected readonly cocktail = this.pageConfig.cocktail;
}
