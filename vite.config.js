import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `npm run build`: sitio normal (Vercel o cualquier servidor).
// `npm run build:usb`: dist-usb/index.html con todo el código y las fuentes adentro, para abrir
// con doble clic desde una USB, sin servidor ni internet (Chrome bloquea los módulos sueltos en file://).
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: mode === 'usb' ? [react(), viteSingleFile()] : [react()],
  build: mode === 'usb' ? { outDir: 'dist-usb', assetsInlineLimit: 100_000_000 } : {},
}));
