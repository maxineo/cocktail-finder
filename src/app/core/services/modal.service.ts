import { Injectable, Type, inject } from '@angular/core';
import { ModalController, ModalOptions } from '@ionic/angular/standalone';
import { Observable, defer, from, map, take } from 'rxjs';
import { AbstractModalComponent } from 'src/app/shared/components/abstract-modal-component/abstract-modal-component';
import { StrictOmit } from 'src/app/shared/types/strict-omit';

type ModalConfig<TData extends Record<string, unknown> | void> = StrictOmit<
	ModalOptions,
'componentProps' | 'component' | 'id'
> &
(TData extends void
	? {

		/** Modal data. */
		modalData?: never;
	}
	: {

		/** Modal data. */
		modalData: TData;
	}) & {

		/** Modal ID. */
		id: string;
	};

/** Modal type. */
export type Modal<TResult> = Readonly<{

	/** Gets an observable that is notified when the modal is finished closing. */
	afterClosed: () => Observable<TResult | null>;

	/** Close modal. */
	close: () => void;
}>;

/** Close modal props. */
export type CloseModalProps<TResult> = Readonly<{

	/** Modal ID. */
	id?: string;

	/** The role of the element that is dismissing the modal. */
	role?: string;

	/** Any data to emit in the dismiss events. */
	data?: TResult;
}>;

type DialogType<T> = T extends AbstractModalComponent<infer _, infer __> ? Type<T> : never;
type DialogProperties<T> = T extends AbstractModalComponent<infer Options, infer _> ? Options : never;
type DialogResult<T> = T extends AbstractModalComponent<infer _, infer Result> ? Result : void;

/** Modal service. */
@Injectable({ providedIn: 'root' })
export class ModalService {
	private readonly modalController = inject(ModalController);

	private readonly openedModals = new Map<string, HTMLIonModalElement>();

	/**
	 * Opens modal component instance.
	 * @param component Modal component. Component class must extend AbstractModalComponent.
	 * @param config Modal config.
	 */
	public async open<T>(
		component: DialogType<T>,
		config: ModalConfig<DialogProperties<T>>,
	): Promise<Modal<DialogResult<T>>> {

		const modal = await this.modalController.create({
			component,
			componentProps: {
				modalData: () => config.modalData,
			},
			...config,
		});

		await modal.present();
		this.openedModals.set(config.id, modal);
		from(modal.onDidDismiss()).pipe(
			take(1),
		)
			.subscribe(() => {
				this.openedModals.delete(config.id);
			});
		return {
			afterClosed: () =>
				defer(() => modal.onDidDismiss()).pipe(map(data => (data.data != null ? (data.data as DialogResult<T>) : null))),

			close: () => modal.dismiss(),
		};
	}

	/**
	 * Closes modal.
	 * Method always closes modal with `null` value to avoid passing untyped and unsafe data.
	 * @param props Close modal props.
	 */
	public close(props?: Pick<CloseModalProps<null>, 'role' | 'id'>): Promise<boolean> {
		return this.modalController.dismiss(null, props?.role, props?.id);
	}
}
