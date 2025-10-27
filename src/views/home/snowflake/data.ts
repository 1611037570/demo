// 技术栈数据对象 - 包含所有类别
const techStackList = {
  // 核心框架与构建工具
  核心框架与构建工具: [
    { name: 'Vue 3', version: '3.5.22', description: '渐进式JavaScript框架', icon: 'logos:vue' },
    {
      name: 'TypeScript',
      version: '5.9.3',
      description: 'JavaScript超集语言',
      icon: 'logos:typescript-icon',
    },
    { name: 'Vite', version: '7.1.9', description: '快速构建工具', icon: 'logos:vitejs' },
    { name: 'Pinia', version: '3.0.3', description: '状态管理库', icon: 'logos:pinia' },
    { name: 'Vue Router', version: '4.5.1', description: '路由管理', icon: 'logos:vue-router' },
    {
      name: 'Element Plus',
      version: '2.11.4',
      description: 'UI组件库',
      icon: 'logos:element-plus',
    },
    {
      name: 'Tailwind CSS',
      version: '4.1.14',
      description: '原子化CSS框架',
      icon: 'logos:tailwindcss-icon',
    },
    { name: 'pnpm', description: '高性能包管理器', icon: 'logos:pnpm-icon' },
  ],

  // 代码质量与规范化
  代码质量与规范化: [
    { name: 'ESLint', description: '代码检查工具', icon: 'logos:eslint' },
    { name: 'Prettier', description: '代码格式化', icon: 'logos:prettier-icon' },
    { name: 'Husky', description: 'Git钩子工具', icon: 'logos:husky' },
    { name: 'commitlint', description: '提交消息规范', icon: 'mdi:file-document-outline' },
    { name: 'Trae', description: 'AI开发工具', icon: 'mdi:hammer-wrench' },
  ],

  // 其他依赖
  其他依赖: [
    { name: '@iconify/vue', description: '图标库', icon: 'logos:iconify' },
    { name: '@vueuse/core', description: 'Vue工具集', icon: 'logos:vue' },
    { name: 'axios', description: 'HTTP客户端', icon: 'logos:axios' },
    { name: 'dayjs', description: '日期处理', icon: 'logos:dayjs' },
    { name: 'html2canvas', description: 'HTML转Canvas', icon: 'mdi:image-plus' },
    { name: 'jspdf', description: 'PDF生成', icon: 'mdi:file-pdf-box' },
    { name: 'pinia-plugin-persistedstate', description: '状态持久化', icon: 'logos:pinia' },
    { name: 'vue-draggable-plus', description: '拖拽功能', icon: 'mdi:grip-vertical' },
    { name: 'chinese-workday', description: '工作日计算', icon: 'mdi:calendar-clock' },
  ],
}

export { techStackList }
