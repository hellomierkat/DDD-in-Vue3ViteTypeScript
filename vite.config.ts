import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// add path: yarn add @types/node --save-dev
import { resolve } from 'path';

// unplugin-auto-import 和 unplugin-vue-components
import authImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig((options: any) => {
  const env = loadEnv(options.mode, process.cwd());
  const { VITE_PROXY_TARGET_URL } = env;

  return {
    // 网站采取二级目录
    base: process.env.NODE_ENV == 'development' ? '' : '/FaultReportingMobile/',

    plugins: [
      vue(),
      authImport({
        imports: ['vue', 'vue-router'],
        dts: 'src/unplugins/auto-import.d.ts'
      }),
      components({
        dirs: ['src/components'],
        extensions: ['vue', 'tsx'],
        dts: 'src/unplugins/components.d.ts'
      })
    ],

    // 代理服务
    server: {
      proxy: {
        '/api': {
          target: VITE_PROXY_TARGET_URL,
          changeOrigin: true, // 允许跨域
          secure: false,
          rewrite: (path) => path.replace(/^\/api\//, '')
        }
      }
    },

    resolve: {

      alias: {
        "@": resolve(__dirname, './src')
      }

    }
  }

})
