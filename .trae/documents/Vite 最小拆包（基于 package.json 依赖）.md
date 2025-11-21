## 目标

- 按 `package.json` 中的 `dependencies` 进行最小化拆包：每个被实际打包的三方依赖单独生成一个 chunk，命名为 `pkg-<依赖名>`。

- 保持现有插件与构建流程不变，仅在 `vite.config.ts` 增加 `manualChunks`。

## 现状

- 已使用 Vite 7 与 Rollup，`vite.config.ts` 尚未定义 `build.rollupOptions.output.manualChunks`；已接入 `visualizer` 便于验证拆包效果。

## 实施步骤

1. 在 `vite.config.ts` 顶部引入 `package.json`（ESM JSON 导入）。
2. 根据 `dependencies` 构建依赖集合，用于约束只对业务实际依赖拆包。
3. 新增 `build.rollupOptions.output.manualChunks`：
   - 规范化路径以兼容 Windows；

   - 从 `node_modules` 提取一级包名，兼容 scoped 包（如 `@vueuse/core`）；

   - 若该包名存在于依赖集合，则返回独立 chunk 名 `pkg-<name>`（移除 `@` 并将 `/` 转为 `-`）。

4. 其余配置保持不变。

## 代码改动（最小增量）

```ts
// vite.config.ts 顶部新增
import pkg from './package.json' with { type: 'json' }

// defineConfig 内新增（靠近 build.rollupOptions）
const deps = new Set(Object.keys(pkg.dependencies || {}))

// 在 build.rollupOptions 下添加 output.manualChunks
output: {
  manualChunks(id) {
    const s = id.replace(/\\/g, '/')
    if (!s.includes('/node_modules/')) return
    const m = s.match(/node_modules\/(#[^/]+\/[^/]+|[^/]+)/.source.replace('#', '@')) || s.match(/node_modules\/(@[^/]+\/[^/]+|[^/]+)/)
    if (!m) return
    const name = m[1]
    if (!deps.has(name)) return
    return `pkg-${name.replace('@', '').replace('/', '-')}`
  },
}
```

## 验证

- 运行 `npm run build`，自动打开可视化报告，检查是否为每个依赖生成 `pkg-*` 独立 chunk。

- 运行 `npm run preview`，确认页面加载正常且按需拉取对应依赖 chunk。

- 抽样查看 `dist/assets`，验证 chunk 命名与数量符合预期。

## 说明

- 该方案按依赖名进行最小拆包，HTTP/2 环境下可提升缓存与按需加载能力；若后续需合并核心生态（如 `vue`/`router`/`pinia`）为单一大块，可在 `manualChunks` 内增加白名单分组规则。
