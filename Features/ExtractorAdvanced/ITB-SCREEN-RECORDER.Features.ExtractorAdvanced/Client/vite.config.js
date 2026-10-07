// ==========================================
// File: Features/ExtractorAdvanced/Client/vite.config.js
// ==========================================
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const currentDir = dirname(fileURLToPath(import.meta.url));

// 💡 נתיב אבסולוטי ישיר לקובץ המקור היחיד בשרת
const sharedDstEnginePath = resolve(currentDir, '../../../../ITB-SCREEN-RECORDER.Server/ClientApp/src/utils/dstEngine.js');
const localTimeFormatPath = resolve(currentDir, 'src/utils/timeFormat.js');

// 💡 תוסף ייעודי שמיירט את כל קריאות ה-Import עוד לפני בדיקת מערכת הקבצים
function sharedModuleResolverPlugin() {
    return {
        name: 'shared-dst-resolver-plugin',
        enforce: 'pre',
        resolveId(source) {
            // תופס כל ייבוא שמסתיים ב-dstEngine (בין אם './utils/dstEngine', './dstEngine.js', וכו')
            if (/dstEngine(\.js)?$/.test(source)) {
                return sharedDstEnginePath;
            }
            // מתקן כל נתיב יחסי ארוך או שבור של timeFormat
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
            // מאפשר ל-Vite לטעון קבצים מחוץ לתיקיית הפרויקט
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