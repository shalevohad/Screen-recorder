import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(import.meta.dirname, './src')
        }
    },
    build: {
        outDir: path.resolve(import.meta.dirname, '../wwwroot'),
        emptyOutDir: true,
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
        strictPort: true,
        proxy: {
            '/api': {
                target: `http://127.0.0.1:${process.env.VITE_SERVER_PORT || 5090}`,
                changeOrigin: true
            },
            '/hubs': {
                target: `http://127.0.0.1:${process.env.VITE_SERVER_PORT || 5090}`,
                ws: true
            }
        }
    }
})