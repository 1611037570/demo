import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
// Vue 3 插件
import vue from '@vitejs/plugin-vue'
// HTML处理插件（用于动态标题等）
import { createHtmlPlugin } from 'vite-plugin-html'
// Vue DevTools 调试工具
import vueDevTools from 'vite-plugin-vue-devtools'
// 自动导入工具
import AutoImport from 'unplugin-auto-import/vite'
// 组件自动导入工具
import Components from 'unplugin-vue-components/vite'
// Element Plus组件解析器
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 包大小可视化工具
import { visualizer } from 'rollup-plugin-visualizer'
// 静态资源压缩插件
import viteCompression from 'vite-plugin-compression'
// 移动端调试工具
import vconsole from 'vite-plugin-vconsole'
// 开发服务器自动重启工具
import ViteRestart from 'vite-plugin-restart'
// 自定义组件解析器
import { CustomComponentResolver } from './src/components/componentsResolver'
// Tailwind CSS插件
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default ({ mode }: { mode: string }) =>
  defineConfig({
    base: './',
    plugins: [
      // Vue 3 插件配置
      vue(),
      // Vue DevTools调试
      vueDevTools(),
      // Tailwind CSS插件配置
      tailwindcss(),
      // HTML插件配置
      createHtmlPlugin({
        minify: true,
        // inject: {
        //   data: {
        //     // 从环境变量中读取标题配置
        //     title: process.env.VITE_APP_TITLE,
        //   },
        // },
      }),
      // 自动导入配置
      AutoImport({
        // Element Plus解析器
        resolvers: [ElementPlusResolver()],
        // 自动导入模块
        imports: ['vue', 'vue-router', '@vueuse/core'],
        // 类型声明文件路径
        dts: 'src/types/autoImports.d.ts',
      }),
      // 组件自动注册配置
      Components({
        // Element Plus解析器
        resolvers: [ElementPlusResolver(), CustomComponentResolver()],
        // 类型声明文件路径
        dts: 'src/types/components.d.ts',
        // 要搜索组件的目录
        dirs: ['src/components'],
        // 要处理的组件文件扩展名
        extensions: ['vue'],
        // 是否深度搜索子目录
        deep: false,
      }),
      // 移动端调试工具
      vconsole({
        // 入口文件
        entry: 'src/main.ts',
        enabled: mode === 'development',
      }),
      ViteRestart({
        // 监听这些文件的变化，触发服务器重启
        restart: ['vite.config.ts'],
      }),
    ],
    // 路径解析配置
    resolve: {
      alias: {
        // @别名指向src目录
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        // 组件目录别名
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      },
    },
    // 开发服务器配置
    server: {
      // 允许外部访问
      host: true,
      // 自动打开浏览器
      open: true,
    },
    // esbuild配置
    esbuild: {
      // 移除打印信息
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },

    // 构建配置
    build: {
      // Rollup配置
      rollupOptions: {
        // 实验性日志副作用
        experimentalLogSideEffects: false,
        plugins: [
          // 包大小可视化
          visualizer({ open: true }),
          // 资源压缩配置
          viteCompression({
            // 输出压缩日志
            verbose: false,
            // 生产环境启用
            disable: mode === 'production' ? false : true,
            // 文件大小阈值
            threshold: 10240,
            // 压缩算法
            algorithm: 'brotliCompress',
            // 压缩文件扩展名
            ext: '.br',
            deleteOriginFile: false,
          }),
        ],
        output: {
          experimentalMinChunkSize: 10 * 1024,
          manualChunks: (id: string) => {
            // 让每个插件都打包成独立的文件
            if (id.includes('node_modules')) {
              // 让每个插件都打包成独立的文件
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
        },
      },
    },
  })
