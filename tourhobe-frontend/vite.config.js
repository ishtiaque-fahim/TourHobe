import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// TourHobe v1.0 - Force rebuild
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})