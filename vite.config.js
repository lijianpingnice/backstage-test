/** @type {import('vite').UserConfig} */
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { wrapperEnv, createProxy } from './build/utils'
import vue from '@vitejs/plugin-vue'
import { configMockPlugin } from './build/plugin/mock';
import viteImagemin from 'vite-plugin-imagemin';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv
  return {
    plugins: [
      vue(),
      configMockPlugin(true),
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false
        },
        optipng: {
          optimizationLevel: 7
        },
        mozjpeg: {
          quality: 20
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox'
            },
            {
              name: 'removeEmptyAttrs',
              active: false
            }
          ]
        }
      })
    ],
    base: VITE_PUBLIC_PATH || '/',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      hmr: true,
      host: '0.0.0.0',  // 默认为'127.0.0.1'，如果将此设置为 `0.0.0.0` 或者 `true` 将监听所有地址，包括局域网和公网地址
      port: VITE_PORT,  // 端口
      proxy: createProxy(VITE_PROXY), // 代理
    },
    build: {
      //打包环境移除console.log，debugger
      minify: 'terser',
      target: 'es2015', // 默认 "modules"
      sourcemap: false, // 构建后是否生成 source map 文件
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        less: {
          charset: false,
          additionalData: '@import "./src/assets/style/global.less";',
        },
      },
    },
  }
})
