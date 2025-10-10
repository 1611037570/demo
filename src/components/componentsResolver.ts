// 自定义组件解析器
import type { ComponentResolver } from 'unplugin-vue-components'

/**
 * 将驼峰式命名转换为短横线命名(kebab-case)
 * @param str 驼峰式命名的字符串
 * @returns 短横线命名的字符串
 */
function camelToKebab(str: string): string {
  const res = str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
  console.log(res)
  return res
}

/**
 * 自定义组件解析器
 * 用于解析带有sf前缀的组件
 * @returns ComponentResolver 符合unplugin-vue-components要求的解析器函数
 */
export const CustomComponentResolver = (): ComponentResolver => {
  return (componentName: string) => {
    console.log('componentName', componentName)
    // 支持sf前缀的组件名称，如sf
    if (componentName.startsWith('Sf')) {
      // 移除sf前缀获取实际组件名
      const actualComponentName = componentName.slice(2).toLowerCase()
      // 将驼峰命名转换为短横线命名
      const kebabComponentName = camelToKebab(actualComponentName)
      return {
        importName: 'default',
        path: `@components/${actualComponentName}/index.vue`,
      }
    }
  }
}
