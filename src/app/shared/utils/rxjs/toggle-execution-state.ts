import { WritableSignal } from '@angular/core';
import { defer, EMPTY, merge, MonoTypeOperatorFunction, Subject } from 'rxjs';
import { finalize, ignoreElements, shareReplay } from 'rxjs/operators';

/**
 * Toggles loading subject when observable execution starts and ends.
 * @param subjectOrSignal$ Execution state subject or signal. Will accept `true` when execution started and `false` when it's finalized.
 */
export function toggleExecutionState<T>(
	subjectOrSignal$: Subject<boolean> | WritableSignal<boolean>,
): MonoTypeOperatorFunction<T> {
	const update = (v: boolean): void => subjectOrSignal$ instanceof Subject ?
		subjectOrSignal$.next(v) :
		subjectOrSignal$.set(v);

	const startLoadingSideEffect$ = defer(() => {
		update(true);
		return EMPTY;
	});

	return source$ => {
		const sharedSource$ = source$.pipe(
			shareReplay({ refCount: true, bufferSize: 1 }),
		);
		const finishLoadingSideEffect$ = sharedSource$.pipe(
			ignoreElements(),
			finalize(() => update(false)),
		);

		return merge(
			startLoadingSideEffect$,
			finishLoadingSideEffect$,
			sharedSource$,
		);
	};
}
