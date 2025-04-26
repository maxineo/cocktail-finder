/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable jsdoc/require-jsdoc */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ImportMeta {
	readonly env: ImportMetaEnv;
}

type ImportMetaEnv = Readonly<{

	/** Current environment. */
	readonly NG_APP_ENV: string;
}>;
