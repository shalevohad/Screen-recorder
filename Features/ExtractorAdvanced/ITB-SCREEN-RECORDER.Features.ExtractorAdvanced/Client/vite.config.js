// ==========================================
// File: Features/ExtractorAdvanced/Client/vite.config.js
// ==========================================
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const currentDir = dirname(fileURLToPath(import.meta.url));

// Direct absolute path to the single source dstEngine file in the Server project
const sharedDstEnginePath = resolve(currentDir, '../../../../ITB-SCREEN-RECORDER.Server/ClientApp/src/utils/dstEngine.js');
const localTimeFormatPath = resolve(currentDir, 'src/utils/timeFormat.js');

/**
 * Custom Vite plugin that intercepts import specifiers before filesystem resolution.
 * Resolves shared dstEngine and local timeFormat paths.
 * 
 * @returns {import('vite').Plugin}
 */
function sharedModuleResolverPlugin() {
    return {
        name: 'shared-dst-resolver-plugin',
        enforce: 'pre',
        resolveId(source) {
            // Intercept any import ending with dstEngine (e.g. './utils/dstEngine', './dstEngine.js')
            if (/dstEngine(\.js)?$/.test(source)) {
                return sharedDstEnginePath;
            }
            // Correct relative or deep paths to timeFormat
            if (/timeFormat(\.js)?$/.test(source)) {
                return localTimeFormatPath;
            }
            return null;
        }
    };
}

export default defineConfig({
    plugins: [
        sharedModuleResolverPlugin(),
        react({
            include: '**/*.{jsx,js}',
        })
    ],
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
    server: {
        fs: {
            // Allow Vite to serve files from parent directories outside the Client folder
            allow: [resolve(currentDir, '../../../../')]
        }
    },
    build: {
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