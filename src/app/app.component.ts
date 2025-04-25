import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

/** App component. */
@Component({
	selector: 'cf-root',
	templateUrl: 'app.component.html',
	imports: [IonApp, IonRouterOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
