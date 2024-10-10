import { fileURLToPath, URL } from 'node:url'
import legacy from '@vitejs/plugin-legacy'
import FullReload from 'vite-plugin-full-reload'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import obfuscator from 'rollup-plugin-obfuscator';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        minify: 'esbuild',
    },
    esbuild: {
        drop: ['debugger'],
    },
    plugins: [
        vue(),
        FullReload(['config/routes.rb', 'app/views/**/*']),
        legacy({
            targets: ['defaults', 'not IE 11'],
        }),
        obfuscator()
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
