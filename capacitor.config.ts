import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	webDir: 'dist/browser',
	android: {
		adjustMarginsForEdgeToEdge: 'force',
	},
};

export default config;
