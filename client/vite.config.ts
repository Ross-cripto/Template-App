import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"



export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ''); // Carga todas las variables de entorno sin prefijo específico


  return {
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env': Object.fromEntries(
      Object.entries(env).filter(([key]) => key.startsWith('REACT_APP_'))
    ),
  }
}})
