/**
 * Roll相关服务层
 * 封装业务逻辑，调用API层，处理数据转换和缓存
 */
import { getIP } from '@/apis'
import baseService from '@/services/baseService'

/**
 * 获取IP信息，带缓存策略
 * @returns IP信息数据
 */
export async function getIPInfo(refresh: boolean = false) {
  const request = async () => {
    return await getIP()
  }
  const data = baseService({
    key: 'ip_info',
    request,
    refresh,
  })
  return data
}
