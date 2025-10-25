/**
 * Roll相关服务层
 * 封装业务逻辑，调用API层，处理数据转换和缓存
 */
import { getIP } from '@/apis'
import { useCacheStore } from '@/stores'

/**
 * 获取IP信息，带缓存策略
 * @param refresh 是否强制刷新缓存
 * @returns IP信息数据
 */
export async function getIPInfo(refresh: boolean = false) {
  // 获取缓存store实例
  const cacheStore = useCacheStore()

  // 缓存键名
  const cacheKey = 'ip_info'

  // 如果不强制刷新，尝试从缓存获取数据
  if (!refresh) {
    const cachedData = cacheStore.getItem(cacheKey)
    if (cachedData !== null) {
      console.log('返回IP信息缓存数据')
      return cachedData
    }
  }

  try {
    // 调用API层获取数据
    const data = await getIP()

    // 存入缓存
    cacheStore.setItem(cacheKey, data)
    console.log('获取并缓存新的IP信息')
    return data
  } catch (error) {
    console.error('获取IP信息失败:', error)
    // 如果请求失败但有缓存，返回缓存数据
    const cachedData = cacheStore.getItem(cacheKey)
    if (cachedData) {
      console.log('请求失败，返回缓存数据')
      return cachedData
    }
    // 没有缓存则抛出错误
    throw error
  }
}
