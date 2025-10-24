// 统一导出所有API接口

// 导入各个模块的API
import * as exampleApi from './modules/example'

// 导出所有API
export const api = {
  ...exampleApi,
}

// 默认导出，方便使用
export default api
