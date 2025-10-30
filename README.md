# Snowflake Index

## 项目背景

本项目于2025年11月22日开源发布，旨在创建一个集功能性与美观性于一体的浏览器起始页。
虽然带有一定的娱乐属性，但同时作为学习项目，集成了国际化、用户行为分析等企业级开发常用功能，提供完整的前端项目实践范例。

## 🔗 在线体验

您可以通过以下链接在线体验已部署的项目：

**[Snowflake Index 官网](http://nannan.work/)**

> 注：正在开发用户搜索行为统计功能

## ✨ 功能特点

- 多搜索引擎支持与快速切换
- 搜索历史记录管理
- 应用内快捷搜索
- 优雅的UI设计与交互体验
- 响应式布局，适配多种设备

## 🛠️ 技术栈

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

## 🚀 安装与运行

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

# 预览构建结果
pnpm preview
```

## 📁 项目结构

```
src/
├── apis/           # API接口定义
├── assets/         # 静态资源
├── components/     # 通用组件
├── datas/          # 静态数据
├── directives/     # 自定义指令
├── hooks/          # 自定义hooks
├── locales/        # 国际化语言包
├── monitors/       # 埋点监控
├── routers/        # 路由配置
├── services/       # 业务服务层
├── stores/         # 状态管理
├── styles/         # 全局样式
├── types/          # 类型定义
├── utils/          # 工具函数
├── views/          # 页面组件
└── App.vue         # 根组件
```

## 📝 开发指南

详细开发规范请参考：[项目开发规则](./.trae/rules/project_rules.md)

### 代码规范

- 使用Prettier进行代码格式化
- 遵循ESLint规范检查
- 采用Husky进行Git提交前检查
- 严格按照commitlint规范编写提交信息

## 🤝 贡献指南

欢迎参与项目开发！请遵循以下步骤进行贡献：

1. **Fork 本仓库**
2. **创建特性分支**：`git checkout -b feature/amazing-feature`
3. **提交更改**：`git commit -m 'feat: add some amazing feature'`
4. **推送分支**：`git push origin feature/amazing-feature`
5. **创建Pull Request**

请确保您的代码符合项目规范，并通过所有检查。

## 📄 许可证

本项目采用 [MIT License](https://opensource.org/licenses/MIT) 开源协议。

## 🎉 致谢

感谢所有为本项目做出贡献的开发者和用户！

## 📮 联系我们

如有问题或建议，请通过项目Issues或Pull Request与我们联系。
