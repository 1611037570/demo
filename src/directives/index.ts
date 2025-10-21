import type { App } from 'vue'
import { registerClassToggle } from './classToggle'

/**
 * 注册所有自定义指令
 */
export function registerDirectives(app: App): void {
  registerClassToggle(app)
}

// 导出单个指令，方便按需使用
export * from './classToggle'