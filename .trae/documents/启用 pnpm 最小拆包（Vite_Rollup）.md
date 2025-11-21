## 背景与目标

- 目标：按包最小化拆分生产构建的 JS chunk，提升浏览器缓存命中率并减少后续发布的二次下载量
- 现状：`vite.config.ts` 已配置 `rollupOptions` 与体积可视化/压缩插件，`manualChunks` 方案处于注释状态，未真正生效

## 变更点

- 启用 `build.rollupOptions.output.manualChunks`，为常用大库设定独立 vendor 分组，其余依包名“一包一 chunk”
- 兼容 pnpm 路径结构（`node_modules/.pnpm/**/node_modules/<pkg>`），确保能正确抽取真实包名
- 修正压缩插件：`algorithm: 'brotliCompress'` 时扩展名使用 `.br`

## 实现方案

- 在 `vite.config.ts` 的 `build.rollupOptions` 下新增如下配置：

```ts
output: {
  manualChunks(id: string) {
    if (!id.includes('node_modules')) return undefined
    if (id.includes('vue') || id.includes('@vue') || id.includes('pinia') || id.includes('vue-router')) return 'vendor.vue'
    if (id.includes('element-plus')) return 'vendor.element-plus'
    if (id.includes('@vueuse')) return 'vendor.vueuse'
    if (id.includes('@iconify')) return 'vendor.iconify'
    const seg = id.split('node_modules/').pop()?.split('/')[0] ?? 'misc'
    const name = seg.replace('@', '').replace('/', '-')
    return `vendor.${name}`
  },
},
```

- 将压缩插件扩展名从 `.gz` 改为 `.br`：

```ts
viteCompression({
  verbose: false,
  disable: mode === 'production' ? false : true,
  threshold: 10240,
  algorithm: 'brotliCompress',
  ext: '.br',
  deleteOriginFile: false,
})
```

## 验证方案

- 运行构建并打开可视化报告，确认各依赖被拆分为独立 `vendor.*` chunk
- 检查 `dist` 内静态资源的压缩文件扩展名为 `.br`
- 预览应用的关键页面，验证首次加载的请求数量与体积是否符合预期

## 影响与注意事项

- “最小拆包”意味着请求数增加；对 HTTP/2/3 场景通常可接受，如首屏请求过多可再合并某些小包
- 已按需引入 Element Plus 和样式，组件层面的代码/样式不会被整包带入；chunk 粒度由依赖包控制
- 保留现有调试与可视化插件；若不希望生产环境自动打开报告，可将 `visualizer({ open: false })`
