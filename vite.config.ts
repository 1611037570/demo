// 路径处理模块
import { fileURLToPath, URL } from 'node:url'

// Tailwind CSS插件
import tailwindcss from '@tailwindcss/vite'
// Vue 3 插件
import vue from '@vitejs/plugin-vue'
// 包大小可视化工具
import { visualizer } from 'rollup-plugin-visualizer'
// 自动导入工具
import AutoImport from 'unplugin-auto-import/vite'
// Element Plus组件解析器
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 组件自动导入工具
import Components from 'unplugin-vue-components/vite'
// Vite配置定义函数
import { defineConfig } from 'vite'
// 静态资源压缩插件
import viteCompression from 'vite-plugin-compression'
// HTML处理插件
import { createHtmlPlugin } from 'vite-plugin-html'
// 开发服务器自动重启工具
import ViteRestart from 'vite-plugin-restart'
// 移动端调试工具
import vconsole from 'vite-plugin-vconsole'
// Vue DevTools 调试工具
import vueDevTools from 'vite-plugin-vue-devtools'
// 自定义组件解析器
import { SnowFlakeComponentResolver } from './src/components/componentsResolver'

// 样式导入插件
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'

// Vite配置导出
export default ({ mode }: { mode: string }) =>
  defineConfig({
    // 基础路径配置
    base: './',
    plugins: [
      // Vue 3 插件配置
      vue(),
      // Tailwind CSS插件配置
      tailwindcss(),

      // HTML插件配置
      createHtmlPlugin({
        minify: true, // 开启HTML压缩
        // inject: {
        //   data: {
        //     // 从环境变量中读取标题配置
        //     title: process.env.VITE_APP_TITLE,
        //   },
        // },
      }),
      // 自动导入配置
      AutoImport({
        resolvers: [ElementPlusResolver()], // Element Plus解析器
        imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'], // 自动导入模块
        dts: 'src/types/autoImports.d.ts', // 类型声明文件路径
      }),
      // 组件自动注册配置
      Components({
        resolvers: [ElementPlusResolver(), SnowFlakeComponentResolver()], // 组件解析器列表
        dts: 'src/types/components.d.ts', // 类型声明文件路径
        dirs: ['src/components'], // 要搜索组件的目录
        extensions: ['.vue'], // 要处理的组件文件扩展名
        deep: false, // 是否深度搜索子目录
      }),
      // 样式导入配置
      createStyleImportPlugin({
        resolves: [ElementPlusResolve()], // 样式解析器
      }),
      // 仅在开发环境启用
      ...(mode === 'development'
        ? [
            // Vue DevTools调试
            vueDevTools(),
            // 移动端调试工具
            vconsole({
              entry: 'src/main.ts', // 入口文件
            }),
            // 开发服务器自动重启
            ViteRestart({
              restart: ['vite.config.ts'], // 监听这些文件的变化，触发服务器重启
            }),
          ]
        : []),
    ],
    // 路径解析配置
    resolve: {
      // 路径别名配置
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)), // @别名指向src目录
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)), // 组件目录别名
        '@views': fileURLToPath(new URL('./src/views', import.meta.url)), // 视图目录别名
      },
    },
    // 开发服务器配置
    server: {
      host: true, // 允许外部访问
      open: true, // 自动打开浏览器
      hmr: true, // 启用服务端渲染
    },
    // esbuild配置
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [], // 移除打印信息
    },

    // 构建配置
    build: {
      chunkSizeWarningLimit: 500, // 警告阈值
      // Rollup配置
      rollupOptions: {
        experimentalLogSideEffects: false, // 实验性日志副作用
        plugins: [
          // 包大小可视化
          visualizer({
            // filename: './node_modules/.cache/visualizer/stats.html',
            open: true, // 自动打开报告
            gzipSize: true, // 显示gzip压缩后的大小
            brotliSize: true, // 显示brotli压缩后的大小
          }),
          // 资源压缩配置
          viteCompression({
            verbose: false, // 输出压缩日志
            disable: mode === 'production' ? false : true, // 生产环境启用
            threshold: 10240, // 文件大小阈值
            algorithm: 'brotliCompress', // 压缩算法
            ext: '.gz', // 压缩文件扩展名
            deleteOriginFile: false, // 是否删除源文件
          }),
        ],
        // 输出配置
        output: {
          experimentalMinChunkSize: 10 * 1024, // 实验性最小 chunk 大小
          // 优化打包分割策略
          manualChunks: (id: string) => {
            if (id.includes('node_modules')) {
              // 基础库单独打包
              if (
                id.includes('vue') ||
                id.includes('@vue') ||
                id.includes('pinia') ||
                id.includes('vue-router')
              ) {
                return 'vendor.vue'
              } else if (id.includes('element-plus')) {
                // Element Plus 组件库单独打包
                return 'vendor.element-plus'
              } else if (id.includes('@vueuse')) {
                // VueUse 工具库单独打包
                return 'vendor.vueuse'
              } else if (id.includes('@iconify')) {
                // 图标相关库单独打包
                return 'vendor.iconify'
              }
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
        },
      },
    },
  })
