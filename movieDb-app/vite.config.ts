import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, '../') };

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)) 
      },
    },
    define: {
      'process.env.VITE_API_PROD_URL': JSON.stringify(process.env.PROD_URL),
    },
  };
});
