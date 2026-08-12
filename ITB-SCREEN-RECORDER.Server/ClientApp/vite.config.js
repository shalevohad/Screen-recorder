import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    build: {
        // הזרקה ישירה ל-wwwroot של השרת
        outDir: path.resolve(import.meta.dirname, '../wwwroot'),
        emptyOutDir: true,

        // השתקת האזהרה על קבצים גדולים (מעלה את הרף ל-1.5MB)
        chunkSizeWarningLimit: 1500,

        rollupOptions: {
            output: {
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name].[ext]'
            }
        }
    },
    server: {
        port: 3100,
        strictPort: true
    }
})