// API统一出口

import * as rollApi from './modules/roll'

// 导出所有API
export const api = {
  ...rollApi,
}

// 默认导出，方便使用
export default api
