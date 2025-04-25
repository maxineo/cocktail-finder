/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable jsdoc/require-jsdoc */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ImportMeta {
	readonly env: ImportMetaEnv;
}

type ImportMetaEnv = Readonly<{

	/**
	 * Built-in environment variable.
	 * @see Docs https://github.com/chihab/ngx-env#ng_app_env.
	 */
	readonly NG_APP_ENV: string;
}>;
