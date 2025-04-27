# cocktail-finder

## Running and building app

Run `npm ci` to install dependencies.

### Web

You can run `npm run start:dev` to start local server.

### Android

1. Run the build script via `npm run android-build:dev`. This will build the web app bundles and put them into the `dist/browser` folder.
2. Then run `npx cap sync` to actually put the build into the native app wrappers.
3. Run `npm run android-start:dev`.
4. Select device you would like to target from the suggested list.
