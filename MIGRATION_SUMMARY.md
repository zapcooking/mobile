# Mobile Repository Migration Summary

## What Was Created

A new `ZapCooking-mobile` repository structure has been created at:
```
/Users/sethsager/Projects/ZapCooking-mobile/
```

## Repository Structure

```
mobile/
├── android/              # Capacitor Android wrapper (copied from frontend)
│   ├── app/
│   ├── gradle/
│   ├── build.gradle
│   └── ... (all Android files, excluding build outputs)
├── web/                  # Placeholder for git submodule
│   └── .gitkeep          # Instructions for submodule setup
├── capacitor.config.ts   # Points to web/build
├── zapstore.yaml         # Zapstore publishing config
├── .gitignore            # Excludes web build, Android build outputs, keystores
├── README.md             # Full documentation
├── SETUP.md              # Submodule setup instructions
└── MIGRATION_SUMMARY.md  # This file
```

## Key Changes from Frontend

1. **Capacitor Config**: `webDir` changed from `'build'` to `'web/build'`
2. **Web App**: Will be managed as git submodule pointing to `zapcooking/frontend`
3. **Android**: Copied as-is, preserving all adapters and signing setup
4. **Zapstore**: Added `zapstore.yaml` for publishing

## Next Steps

### 1. Initialize Git Repository

```bash
cd /Users/sethsager/Projects/ZapCooking-mobile
git init
git add .
git commit -m "Initial mobile repository structure"
```

### 2. Set Up Web Submodule

```bash
# Remove placeholder
rm web/.gitkeep

# Add submodule
git submodule add https://github.com/zapcooking/frontend.git web

# Initialize
git submodule update --init --recursive

# Build web app
cd web
pnpm install
pnpm build
cd ..
```

### 3. Sync Capacitor

```bash
npx cap sync android
```

### 4. Test Build

```bash
cd android
./gradlew assembleRelease
```

### 5. Create GitHub Repository

1. Create new repo: `https://github.com/zapcooking/mobile`
2. Push:
   ```bash
   git remote add origin https://github.com/zapcooking/mobile.git
   git push -u origin main
   ```

### 6. Verify Zapstore Config

Update `zapstore.yaml` if the repository URL differs, then test:
```bash
zapstore publish
```

## Important Notes

- **Keystore**: The keystore file (`android/zap-cooking-release.keystore`) is in `.gitignore` but was copied. Ensure it's backed up securely.
- **Web Changes**: All web app changes should be made in `zapcooking/frontend`, then pulled into this repo via submodule update.
- **Android Changes**: Mobile-specific Android changes (adapters, configs) are made directly in this repo's `android/` directory.
- **No Frontend Changes**: The frontend repository remains unchanged and continues to work independently.

## Workflow

### Daily Development
1. Make web changes in `zapcooking/frontend`
2. Build and test in frontend repo
3. Pull changes into mobile:
   ```bash
   cd web
   git pull origin main
   cd ..
   pnpm build --prefix web
   npx cap sync android
   ```

### Release Process
1. Update web submodule to desired commit/tag
2. Build web: `pnpm build --prefix web`
3. Sync Capacitor: `npx cap sync android`
4. Build APK: `cd android && ./gradlew assembleRelease`
5. Publish: `zapstore publish`

## Files Excluded

The following were intentionally excluded from the Android copy:
- `android/app/build/` - Build outputs
- `android/build/` - Build outputs
- `android/.gradle/` - Gradle cache
- `android/.idea/` - IDE files
- `node_modules/` - Dependencies (will be installed separately)

These are in `.gitignore` and will be regenerated during build.

