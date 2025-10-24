import request from '../request'

// 示例API接口模块
export const exampleApi = {
  // 获取示例列表
  getList: (params) => {
    return request({
      url: '/example/list',
      method: 'get',
      params,
    })
  },

  // 获取示例详情
  getDetail: (id) => {
    return request({
      url: `/example/detail/${id}`,
      method: 'get',
    })
  },

  // 创建示例
  create: (data) => {
    return request({
      url: '/example/create',
      method: 'post',
      data,
    })
  },

  // 更新示例
  update: (id, data) => {
    return request({
      url: `/example/update/${id}`,
      method: 'put',
      data,
    })
  },

  // 删除示例
  delete: (id) => {
    return request({
      url: `/example/delete/${id}`,
      method: 'delete',
    })
  },
}
