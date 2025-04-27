# cocktail-finder

## Running and building app

Run `npm ci` to install dependencies.

### Web

You can run `npm run start:dev` to start local server.

### Android

1. Run the build script via `npm run android-build:dev`. This will build the web app bundles and put them into the `dist/browser` folder.
2. Run `npx cap sync`.
3. Then open the native project in Xcode or Android Studio and run the app. You can use `npx cap open android` to open the native project in Android Studio.

To run the application for local development with live reloading feature, you'll first need to install emulator device in Android Studio or you can connect physical device.

1. Run the native build script via `npm run android-start:dev`.
2. Select device you would like to target from the suggested list.
