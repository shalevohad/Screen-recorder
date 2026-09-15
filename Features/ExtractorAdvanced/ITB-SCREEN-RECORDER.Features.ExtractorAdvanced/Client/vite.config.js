// ==========================================
// File: Features/ExtractorAdvanced/Client/vite.config.js
// ==========================================
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [react()],
    define: {
        // מונע קריסה של React בדפדפן על משתנה process
        'process.env.NODE_ENV': JSON.stringify('production')
    },
    resolve: {
        extensions: ['.mjs', '.js', '.jsx', '.json']
    },
    build: {
        lib: {
            entry: resolve(currentDir, 'src/index.js'),
            name: 'ExtractorAdvancedWidget',
            fileName: () => 'extractor-advanced.widget.js',
            formats: ['es']
        },
        outDir: resolve(currentDir, '../wwwroot'),
        emptyOutDir: true,
        rollupOptions: {
            // מערך ריק מבטיח ש-React ו-ReactDOM נארזים במלואם לתוך הקובץ
            external: [],
            output: {
                // שומר על ייחודיות קובץ העיצוב למניעת דריסות בין הפיצ'רים
                assetFileNames: 'extractor-advanced.style.[ext]'
            }
        }
    }
});