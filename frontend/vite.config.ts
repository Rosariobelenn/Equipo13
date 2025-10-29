import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
  proxy: {
    '/v1/api': {
      target: 'https://pymego.onrender.com',
      changeOrigin: true,
      secure: false,
    },
  },
}

})
