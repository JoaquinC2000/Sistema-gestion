import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. Importamos el plug-in que acabamos de bajar

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // 2. Se lo inyectamos a Vite para que procese nuestro CSS
  ],
})