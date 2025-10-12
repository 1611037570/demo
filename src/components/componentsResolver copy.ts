// 自定义组件解析器
/**
 * 自定义组件解析器
 * 用于解析带有sf前缀的组件
 * @returns ComponentResolver 符合unplugin-vue-components要求的解析器函数
 */
export const SnowFlakeComponentResolver = (componentName: string) => {
  if (componentName && componentName.startsWith('Sf')) {
    // 移除sf前缀获取实际组件名
    const name = componentName.slice(2).toLowerCase()
    const path = `@components/${name}/index.vue`
    return {
      importName: name,
      name,
      path,
      // from: '@components',
    }
  }
}
