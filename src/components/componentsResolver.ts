// 自定义组件解析器
import type { ComponentResolver } from 'unplugin-vue-components'
/**
 * 自定义组件解析器
 * 用于解析带有sf前缀的组件
 * @returns ComponentResolver 符合unplugin-vue-components要求的解析器函数
 */
export const CustomComponentResolver = (): ComponentResolver => {
  return (componentName: string) => {
    // 支持sf前缀的组件名称，如sf
    if (componentName.startsWith('Sf')) {
      // 移除sf前缀获取实际组件名
      const actualComponentName = componentName.slice(2).toLowerCase()

      return {
        importName: 'default',
        path: `@components/${actualComponentName}/index.vue`,
      }
    }
  }
}
