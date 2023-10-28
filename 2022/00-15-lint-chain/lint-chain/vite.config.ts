import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteEslint from 'vite-plugin-eslint';
import viteStyleLint from 'vite-plugin-stylelint';

const styleGlobalVariable = path.resolve('./src/style/variable.scss');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteEslint({
      fix: true
    }),
    viteStyleLint({
      fix: true
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${styleGlobalVariable}";`
      }
    }
  }
});
