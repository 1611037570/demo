# Snowflake Index

一款美观实用、功能丰富的浏览器起始页，融合了多种搜索功能与个性化元素，为用户提供高效便捷的上网入口。

## 项目背景

2025年11月22日今日小雪，开源并发布在GitHub上。作为一款带有摸鱼属性的起始页，它不仅提供快速搜索功能，还集成了多种实用工具。

## 功能特点

- 多搜索引擎支持与快速切换
- 搜索历史记录管理
- 应用内快捷搜索
- 优雅的UI设计与交互体验
- 响应式布局，适配多种设备

## 完整技术栈

### 核心框架与构建工具

- **开发语言**: Vue 3 + TypeScript
- **脚手架**: Vite
- **状态管理**: Pinia
- **路由管理**: Vue Router
- **组件库**: Element Plus
- **样式方案**: Tailwind CSS
- **包管理器**: pnpm
- **开发工具**: Trae

### 代码质量与规范化

- **代码检查**: ESLint
- **代码格式化**: Prettier
- **Git hooks**: Husky
- **提交规范**: commitlint

### 其他依赖

- **图标库**: @iconify/vue
- **自定义钩子**: useEventListener, useCountdown, useCurrentTime

## 安装与运行

```bash
# 克隆项目
git clone https://github.com/yourusername/snowflake-index.git

# 进入项目目录
cd snowflake-index

# 安装依赖
pnpm install

# 开发环境运行
pnpm dev

# 构建生产版本
pnpm build
```

## 项目结构

```
src/
├── components/     # 通用组件
├── directives/     # 自定义指令
├── hooks/          # 自定义hooks
├── router/         # 路由配置
├── stores/         # 状态管理
├── styles/         # 全局样式
├── types/          # 类型定义
├── utils/          # 工具函数
├── views/          # 页面组件
└── App.vue         # 根组件
```

## 项目开发规则

详细开发规范请参考：[项目开发规则](./.trae/rules/project_rules.md)

## 许可证

[MIT License](https://opensource.org/licenses/MIT)
