import { Injectable } from '@angular/core';

/** App config. */
@Injectable({ providedIn: 'root' })
export class AppConfig {

	/** Api URL. */
	public readonly apiUrl: string = import.meta.env.NG_APP_API_URL;

}
