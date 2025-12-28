# Zap Cooking Mobile

This repository manages the mobile Android app for Zap Cooking, built with Capacitor.

## Repository Structure

```
mobile/
├── android/          # Capacitor Android wrapper + adapters
├── web/             # Web app (sourced from zapcooking/frontend)
├── capacitor.config.ts
├── zapstore.yaml
└── README.md
```

## Web App Source

The `web/` directory contains the web application sourced from [zapcooking/frontend](https://github.com/zapcooking/frontend).

**Important:** The web folder is managed as a git submodule. Do not edit files in `web/` directly in this repository.

## Setup

### Initial Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/zapcooking/mobile.git
   cd mobile
   ```

2. Initialize and update the web submodule:
   ```bash
   git submodule update --init --recursive
   ```

3. Build the web app for mobile:
   ```bash
   cd web
   pnpm install
   pnpm build:mobile
   cd ..
   ```

4. Sync Capacitor with the web build:
   ```bash
   npx cap sync android
   ```

### Updating Web App

To pull the latest changes from the frontend repository:

```bash
cd web
git pull origin main  # or the appropriate branch
cd ..
pnpm build:mobile --prefix web
npx cap sync android
```

Or update to a specific commit/tag:
```bash
cd web
git fetch origin
git checkout <commit-or-tag>
cd ..
pnpm build:mobile --prefix web
npx cap sync android
```

## Building Android Release APK

1. Ensure the web app is built for mobile:
   ```bash
   cd web
   pnpm build:mobile
   cd ..
   ```

2. Sync Capacitor:
   ```bash
   npx cap sync android
   ```

3. Build the release APK:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

4. The APK will be located at:
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

## Publishing to Zapstore

1. Build the release APK (see above)

2. Publish using zapstore CLI:
   ```bash
   zapstore publish
   ```

The `zapstore.yaml` configuration will automatically include the release APK from `android/app/build/outputs/apk/release/*.apk`.

## Development

### Running in Android Studio

1. Build the web app for mobile:
   ```bash
   cd web
   pnpm build:mobile
   cd ..
   ```

2. Sync Capacitor:
   ```bash
   npx cap sync android
   ```

3. Open Android Studio:
   ```bash
   npx cap open android
   ```

### Hot Reload (Development)

For faster development, you can run the web app in dev mode and point Capacitor to it:

1. In one terminal, start the web dev server:
   ```bash
   cd web
   pnpm dev
   ```

2. Update `capacitor.config.ts` temporarily:
   ```typescript
   server: {
     url: 'http://localhost:5173',  // or your dev server port
     androidScheme: 'https'
   }
   ```

3. Sync and run:
   ```bash
   npx cap sync android
   npx cap open android
   ```

Remember to revert the `server.url` before building for release!

## Notes

- The `android/` directory contains mobile-specific configurations and adapters
- The `web/` directory should not be modified directly - all web changes go to `zapcooking/frontend`
- Capacitor sync must be run after any web build changes
- The keystore for signing is located at `android/zap-cooking-release.keystore` (not committed to git)

## Troubleshooting

### Web submodule is empty

If the `web/` directory appears empty:
```bash
git submodule update --init --recursive
```

### Capacitor can't find web build

Ensure you've built the web app for mobile:
```bash
cd web
pnpm build:mobile
cd ..
npx cap sync android
```

### Android build fails

1. Clean the build:
   ```bash
   cd android
   ./gradlew clean
   ```

2. Rebuild web and sync:
   ```bash
   cd ../web
   pnpm build:mobile
   cd ..
   npx cap sync android
   ```

