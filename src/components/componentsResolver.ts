// 自定义组件解析器
import type { ComponentResolver } from 'unplugin-vue-components'

export const SnowFlakeComponentResolver = (): ComponentResolver => {
  return (componentName: string) => {
    if (componentName.startsWith('Sf')) {
      const name = componentName
      const path = `@components/${name.slice(2).toLowerCase()}/index.vue`
      return {
        // importName: name,
        path,
        name,
        from: path,
      }
    }
  }
}
