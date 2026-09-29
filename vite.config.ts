import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  base: '/counterplay-jjs/',
  plugins: [react()],
});
