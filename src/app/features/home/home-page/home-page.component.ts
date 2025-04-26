import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
	IonContent,
	IonSearchbar,
	IonToolbar,
	IonHeader,
	IonButtons,
	IonButton,
	IonIcon,
	IonTitle,
} from '@ionic/angular/standalone';
import {
	diceOutline,
	searchOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

/** Home page component. */
@Component({
	selector: 'cf-home-page',
	templateUrl: './home-page.component.html',
	styleUrl: './home-page.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		IonTitle,
		IonHeader,
		IonSearchbar,
		IonToolbar,
		IonContent,
		IonButtons,
		IonButton,
		IonIcon,
		ReactiveFormsModule,
	],
})
export class HomePageComponent {

	private readonly fb = inject(NonNullableFormBuilder);

	/** Search control. */
	protected readonly searchControl = this.fb.control('');

	public constructor() {
		addIcons({ diceOutline, searchOutline });
	}

}
