import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [react()],
    define: {
        // Prevents React runtime crashes in the browser regarding missing process variable
        'process.env.NODE_ENV': JSON.stringify('production')
    },
    resolve: {
        extensions: ['.mjs', '.js', '.jsx', '.json']
    },
    build: {
        lib: {
            entry: resolve(currentDir, 'src/index.js'),
            name: 'ExtractorWidget',
            fileName: () => 'extractor.widget.js',
            formats: ['es']
        },
        outDir: resolve(currentDir, '../wwwroot'),
        emptyOutDir: true,
        rollupOptions: {
            // Empty array guarantees React and ReactDOM are bundled completely into the self-contained widget
            external: [],
            output: {
                // Preserves discrete stylesheet asset naming to avoid clashes across features
                assetFileNames: 'style.css'
            }
        }
    }
});