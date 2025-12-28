# Initial Setup Instructions

## Setting up the Web Submodule

After cloning this repository, you need to set up the web submodule that points to `zapcooking/frontend`.

### Option 1: Git Submodule (Recommended)

1. Add the submodule:
   ```bash
   git submodule add https://github.com/zapcooking/frontend.git web
   ```

2. Initialize and update:
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

### Option 2: Git Subtree (Alternative)

If you prefer not to use submodules:

```bash
git subtree add --prefix=web https://github.com/zapcooking/frontend.git main --squash
```

To update later:
```bash
git subtree pull --prefix=web https://github.com/zapcooking/frontend.git main --squash
```

## After Setup

1. Install Capacitor CLI globally (if not already):
   ```bash
   npm install -g @capacitor/cli
   ```

2. Sync Capacitor:
   ```bash
   npx cap sync android
   ```

3. You're ready to build! See README.md for build instructions.

