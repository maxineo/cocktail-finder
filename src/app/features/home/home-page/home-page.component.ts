import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import {
	IonContent,
	IonSearchbar,
	IonToolbar,
	IonHeader,
	IonButtons,
	IonButton,
	IonIcon,
	IonTitle,
	IonSpinner,
} from '@ionic/angular/standalone';
import {
	diceOutline,
	searchOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CocktailsService } from 'src/app/core/services/cocktail-api.service';
import { distinctUntilChanged, map, Subject, switchMap, withLatestFrom } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { toggleExecutionState } from 'src/app/shared/utils/rxjs/toggle-execution-state';

import { Keyboard } from '@capacitor/keyboard';

import { CocktailsListComponent } from '../cocktails-list/cocktails-list.component';

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
		IonSpinner,
		IonIcon,
		ReactiveFormsModule,
		CocktailsListComponent,
	],
})
export class HomePageComponent {

	private readonly destroyRef = inject(DestroyRef);

	private readonly fb = inject(NonNullableFormBuilder);

	private readonly cocktailsService = inject(CocktailsService);

	private readonly reloadCocktails$ = new Subject<void>();

	/** Search control. */
	protected readonly searchControl = this.fb.control('', [Validators.required]);

	/** Cocktails. */
	protected readonly cocktails = toSignal(this.reloadCocktails$.pipe(
		withLatestFrom(this.searchControl.valueChanges),
		map(([_, value]) => value),
		distinctUntilChanged(),
		switchMap(value => this.cocktailsService.getByName(value).pipe(
			toggleExecutionState(this.isLoadingCocktails),
		)),
	), { initialValue: [] });

	/** Whether loading cocktails. */
	protected readonly isLoadingCocktails = signal(false);

	public constructor() {
		addIcons({ diceOutline, searchOutline });
	}

	/** Handles enter keyup event. */
	protected handleEnterKeyUp(): void {
		this.searchControl.markAsTouched();
		if (this.searchControl.invalid) {
			return;
		}
		this.reloadCocktails$.next();
		Keyboard.hide();
	}

	/** Handles search button click. */
	protected onSearchButtonClick(): void {
		this.searchControl.markAsTouched();
		if (this.searchControl.invalid) {
			return;
		}
		this.reloadCocktails$.next();
	}
}
