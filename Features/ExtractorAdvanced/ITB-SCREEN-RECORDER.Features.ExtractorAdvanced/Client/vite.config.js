// ==========================================
// File: Features/ExtractorAdvanced/Client/vite.config.js
// ==========================================
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [
        react({
            include: '**/*.{jsx,js}',
        })
    ],
    // הגדרת ספריית המקור לקבצים סטטיים (Client/public)
    publicDir: resolve(currentDir, 'public'),
    esbuild: {
        loader: 'jsx',
        include: /src\/.*\.[jt]sx?$/,
        exclude: []
    },
    define: {
        'process.env.NODE_ENV': JSON.stringify('production')
    },
    resolve: {
        extensions: ['.mjs', '.js', '.jsx', '.json']
    },
    build: {
        // 💡 מאפשר ל-Vite להעתיק את public/ ל-wwwroot גם ב-Library Mode
        copyPublicDir: true,
        lib: {
            entry: resolve(currentDir, 'src/index.js'),
            name: 'ExtractorAdvancedWidget',
            fileName: () => 'extractor-advanced.widget.js',
            formats: ['es']
        },
        outDir: resolve(currentDir, '../wwwroot'),
        emptyOutDir: true,
        rollupOptions: {
            external: [],
            output: {
                assetFileNames: 'extractor-advanced.style.[ext]'
            }
        }
    }
});