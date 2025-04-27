import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonContent, IonIcon, IonTitle } from '@ionic/angular/standalone';
import { Cocktail } from 'src/app/core/models/cocktail';
import { AbstractModalComponent } from 'src/app/shared/components/abstract-modal-component/abstract-modal-component';
import { closeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

import { CocktailDetailsComponent } from '../cocktail-details/cocktail-details.component';

/** Cocktail modal ID. */
export const COCKTAIL_MODAL_ID = 'cocktail-modal-id';

type ModalData = Readonly<{

	/** Cocktail. */
	cocktail: Cocktail;
}>;

/** Cocktail modal. */
@Component({
	selector: 'cf-cocktail-modal',
	imports: [IonTitle, IonIcon, IonContent, IonButton, IonButtons, IonToolbar, IonHeader, CocktailDetailsComponent],
	templateUrl: './cocktail-modal.component.html',
	styleUrl: './cocktail-modal.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CocktailModalComponent extends AbstractModalComponent<ModalData> {

	/** @inheritdoc */
	protected override id = COCKTAIL_MODAL_ID;

	/** Cocktail. */
	public readonly cocktail = computed(() => this.modalData().cocktail);

	public constructor() {
		super();
		addIcons({ closeOutline });
	}
}
