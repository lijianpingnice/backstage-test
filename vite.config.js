import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import { wrapperEnv, createProxy } from './build/utils'
import vue from '@vitejs/plugin-vue'
import { configMockPlugin } from './build/plugin/mock';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv
  return {
    plugins: [vue(), configMockPlugin(true)],
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
      target: 'es2015', // 默认 "modules"
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
