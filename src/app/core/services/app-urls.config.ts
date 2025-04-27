import { Injectable, inject } from '@angular/core';

import { Cocktail } from '../models/cocktail';

import { AppConfig } from './appConfig.service';

/**
 * Urls used within the application.
 * Stringified for convenience, since most of the Angular's HTTP tools work with strings.
 */
@Injectable({ providedIn: 'root' })
export class AppUrlsConfig {

	private readonly appConfigService = inject(AppConfig);

	/** Cocktails routes. */
	public readonly cocktails = {
		entity: (id: Cocktail['id']) => this.toApi(`lookup.php?i=${id}`),
		listByName: (name: string) => this.toApi(`search.php?s=${name}`),
	};

	private toApi(...args: readonly string[]): string {
		const path = args.join('/');
		return new URL(path, this.appConfigService.apiUrl).toString();
	}
}
