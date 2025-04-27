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
	dice,
	search,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CocktailsService } from 'src/app/core/services/cocktail-api.service';
import { distinctUntilChanged, from, map, Subject, switchMap, take, withLatestFrom } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { toggleExecutionState } from 'src/app/shared/utils/rxjs/toggle-execution-state';
import { Keyboard } from '@capacitor/keyboard';
import { ModalService } from 'src/app/core/services/modal.service';
import { Capacitor } from '@capacitor/core';

import { CocktailsListComponent } from '../cocktails-list/cocktails-list.component';
import { COCKTAIL_MODAL_ID, CocktailModalComponent } from '../../cocktails/cocktail-modal/cocktail-modal.component';

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

	private readonly modalService = inject(ModalService);

	private readonly reloadCocktails$ = new Subject<void>();

	/** Search control. */
	protected readonly searchControl = this.fb.control('', [Validators.required]);

	/** Whether search has been performed. */
	protected readonly isSearchPerformed = signal(false);

	/** Cocktails. */
	protected readonly cocktails = toSignal(this.reloadCocktails$.pipe(
		withLatestFrom(this.searchControl.valueChanges),
		map(([_, value]) => value),
		distinctUntilChanged(),
		switchMap(value => this.cocktailsService.getByName(value).pipe(
			toggleExecutionState(this.isLoadingCocktailsList),
		)),
	), { initialValue: [] });

	/** Whether loading cocktails. */
	protected readonly isLoadingCocktailsList = signal(false);

	/** Whether loading random cocktail. */
	protected readonly isLoadingRandomCocktail = signal(false);

	public constructor() {
		addIcons({ dice, search });
	}

	/** Handles enter keyup event. */
	protected handleEnterKeyUp(): void {
		this.searchControl.markAsTouched();
		if (this.searchControl.invalid) {
			return;
		}
		this.reloadCocktails$.next();
		this.isSearchPerformed.set(true);
		if (Capacitor.isPluginAvailable('Keyboard')) {
			Keyboard.hide();
		}
	}

	/** Handles search button click. */
	protected onSearchButtonClick(): void {
		this.searchControl.markAsTouched();
		if (this.searchControl.invalid) {
			return;
		}
		this.reloadCocktails$.next();
		this.isSearchPerformed.set(true);
	}

	/** Handles random cocktail button click. */
	protected onRandomCocktailButtonClick(): void {
		this.cocktailsService.getRandom().pipe(
			take(1),
			toggleExecutionState(this.isLoadingRandomCocktail),
			switchMap(cocktail => from(this.modalService.open(
				CocktailModalComponent,
				{
					id: COCKTAIL_MODAL_ID,
					modalData: {
						cocktail,
					},
				},
			))),
			takeUntilDestroyed(this.destroyRef),
		)
			.subscribe();
	}
}
