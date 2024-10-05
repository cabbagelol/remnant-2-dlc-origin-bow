import { fileURLToPath, URL } from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import obfuscator from 'rollup-plugin-obfuscator';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        minify: 'esbuild', // 默认
    },
    esbuild: {
        drop: ['console', 'debugger'],//打包去除
    },
    plugins: [
        vue(),
        obfuscator({
            global: false,
            options: {
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 0.75,
                numbersToExpressions: true,
                simplify: true,
                stringArrayShuffle: true,
                splitStrings: true,
                splitStringsChunkLength: 10,
                rotateUnicodeArray: true,
                deadCodeInjection: true,
                deadCodeInjectionThreshold: 0.4,
                debugProtection: false,
                debugProtectionInterval: 2000,
                disableConsoleOutput: true,
                domainLock: [],
                identifierNamesGenerator: "hexadecimal",
                identifiersPrefix: "",
                inputFileName: "",
                log: true,
                renameGlobals: true,
                reservedNames: [],
                reservedStrings: [],
                seed: 0,
                selfDefending: true,
                sourceMap: false,
                sourceMapBaseUrl: "",
                sourceMapFileName: "",
                sourceMapMode: "separate",
                stringArray: true,
                stringArrayEncoding: ["base64"],
                stringArrayThreshold: 0.75,
                target: "browser",
                transformObjectKeys: true,
                unicodeEscapeSequence: true,

                domainLockRedirectUrl: "about:blank",
                forceTransformStrings: [],
                identifierNamesCache: null,
                identifiersDictionary: [],
                ignoreImports: true,
                optionsPreset: "default",
                renameProperties: false,
                renamePropertiesMode: "safe",
                sourceMapSourcesMode: "sources-content",

                stringArrayCallsTransform: true,
                stringArrayCallsTransformThreshold: 0.5,

                stringArrayIndexesType: ["hexadecimal-number"],
                stringArrayIndexShift: true,
                stringArrayRotate: true,
                stringArrayWrappersCount: 1,
                stringArrayWrappersChainedCalls: true,
                stringArrayWrappersParametersMaxCount: 2,
                stringArrayWrappersType: "variable",
            }
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
