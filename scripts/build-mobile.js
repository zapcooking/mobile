#!/usr/bin/env node
/**
 * Mobile Build Script
 * 
 * This script builds the web app with the static adapter for Capacitor/Android.
 * It temporarily replaces the web svelte.config.js with our mobile-specific config.
 */

import { execSync } from 'child_process';
import { copyFileSync, existsSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const webDir = join(rootDir, 'web');

const mobileConfig = join(rootDir, 'svelte.config.mobile.js');
const webConfig = join(webDir, 'svelte.config.js');
const webConfigBackup = join(webDir, 'svelte.config.js.backup');

function run(cmd, options = {}) {
  console.log(`\n> ${cmd}\n`);
  execSync(cmd, { stdio: 'inherit', ...options });
}

async function main() {
  console.log('🔧 Mobile Build Script');
  console.log('='.repeat(50));

  // 1. Check if web submodule exists
  if (!existsSync(webDir)) {
    console.error('❌ web/ directory not found. Run: git submodule update --init');
    process.exit(1);
  }

  // 2. Install web dependencies if needed
  const nodeModules = join(webDir, 'node_modules');
  if (!existsSync(nodeModules)) {
    console.log('\n📦 Installing web dependencies...');
    run('pnpm install', { cwd: webDir });
  }

  // 3. Backup original svelte.config.js
  console.log('\n📋 Backing up original svelte.config.js...');
  if (existsSync(webConfig)) {
    copyFileSync(webConfig, webConfigBackup);
  }

  try {
    // 4. Copy mobile config to web
    console.log('\n📱 Applying mobile svelte config (static adapter)...');
    copyFileSync(mobileConfig, webConfig);

    // 5. Build
    console.log('\n🏗️  Building web app with static adapter...');
    run('pnpm build', { cwd: webDir });

    console.log('\n✅ Build complete! Output in web/build/');

  } finally {
    // 6. Restore original config
    console.log('\n🔄 Restoring original svelte.config.js...');
    if (existsSync(webConfigBackup)) {
      copyFileSync(webConfigBackup, webConfig);
      unlinkSync(webConfigBackup);
    }
  }

  console.log('\n🎉 Mobile build finished!');
  console.log('Next steps:');
  console.log('  pnpm cap:sync    # Sync with Capacitor');
  console.log('  pnpm cap:open    # Open in Android Studio');
}

main().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
