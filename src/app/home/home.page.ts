import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

/** Home page. */
@Component({
	selector: 'cf-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.css'],
	imports: [IonHeader, IonToolbar, IonTitle, IonContent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
