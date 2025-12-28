import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'cooking.zap.app',
  appName: 'Zap Cooking',
  webDir: 'web/build',
  server: {
    androidScheme: 'https'
  },
  android: {
    backgroundColor: '#111827',
    allowMixedContent: false
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#1a1a1a",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;
