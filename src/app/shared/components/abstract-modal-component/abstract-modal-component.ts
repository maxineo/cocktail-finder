import { Component, inject, input, ChangeDetectionStrategy } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { CloseModalProps } from 'src/app/core/services/modal.service';

/** Abstract modal component. */
@Component({
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class AbstractModalComponent<
	TData extends Record<string, unknown> | void = void,
	TResult = undefined,
> {
	private readonly modalController = inject(ModalController);

	/** Modal data. */
	protected readonly modalData = input.required<TData extends void ? undefined : TData>();

	/**
		* Modal ID.
		* It's important to use an ID for modals,
		* since a just `close()` without a provided modal ID
		* may lead to the top modal being closed (for example, loading), instead of the current modal.
		*/
	protected abstract readonly id: string;

	/**
	 * Whether need to add behavior of closing modal when browser back button is clicked.
	 * `true` by default.
	 */
	protected readonly shouldCloseOnBackButton: boolean = true;

	/**
		* Close modal.
		* @param props Close modal props.
		*/
	protected close(props?: CloseModalProps<TResult>): Promise<boolean> {
		return this.modalController.dismiss(props?.data, props?.role, this.id);
	}
}
