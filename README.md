# Zap Cooking Mobile

Android app for [Zap Cooking](https://zap.cooking) - a Nostr-native cooking and recipe platform.

## Repository Structure

```
mobile/
├── android/                    # Capacitor Android wrapper
├── web/                        # Git submodule → zapcooking/frontend
├── scripts/
│   └── build-mobile.js         # Build script (applies static adapter)
├── svelte.config.mobile.js     # Mobile-specific config (static adapter)
├── capacitor.config.ts         # Capacitor configuration
├── package.json
├── zapstore.yaml
└── README.md
```

## Prerequisites

- Node.js 22.x
- pnpm
- Android Studio with SDK 34+
- Java 17+

## Initial Setup

```bash
# Clone with submodule
git clone --recursive https://github.com/zapcooking/mobile.git
cd mobile

# Or if already cloned:
git submodule update --init

# Install mobile dependencies
pnpm install

# Install web dependencies
pnpm install:web
```

## Development Workflow

### Update Web Source

Pull latest changes from the frontend repo:

```bash
cd web
git pull origin main
cd ..
git add web
git commit -m "Update web submodule"
```

### Build for Android

```bash
# Build web app with static adapter
pnpm build:mobile

# Sync with Capacitor
pnpm cap:sync

# Open in Android Studio
pnpm cap:open
```

### Build Release APK

```bash
# Full release build
pnpm release

# Or manually:
pnpm build:mobile
pnpm cap:sync
cd android
./gradlew assembleRelease
```

The APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

## Signing

Release builds require a keystore. Create `android/keystore.properties`:

```properties
storeFile=zap-cooking-release.keystore
storePassword=YOUR_PASSWORD
keyAlias=YOUR_KEY_ALIAS
keyPassword=YOUR_KEY_PASSWORD
```

## Zapstore Publishing

```bash
# Build release APK
pnpm release

# Publish to Zapstore
zapstore publish
```

## Architecture

- **Frontend repo** ([zapcooking/frontend](https://github.com/zapcooking/frontend)): Pure web app, deploys to Cloudflare
- **Mobile repo** (this): Wraps frontend for Android with Capacitor

The mobile build process:
1. Temporarily applies `svelte.config.mobile.js` (static adapter) to web/
2. Builds the SvelteKit app as static files
3. Restores original config
4. Capacitor syncs the static files into the Android app

This keeps the frontend repo clean (web-only) while mobile handles its own concerns.
