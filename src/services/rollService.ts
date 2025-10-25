/**
 * Roll相关服务层
 * 封装业务逻辑，调用API层，处理数据转换和缓存
 */
import { getIP } from '../api/modules/roll';
import CacheUtil from '../utils/cacheUtil';

class RollService {
  /**
   * 获取IP信息，带缓存策略
   * @param refresh 是否强制刷新缓存
   * @returns IP信息数据
   */
  async getIPInfo(refresh: boolean = false) {
    // 生成缓存键名
    const cacheKey = CacheUtil.generateKey('ip_info');
    
    // 如果不强制刷新且缓存有效，返回缓存数据
    if (!refresh && CacheUtil.has(cacheKey)) {
      console.log('返回IP信息缓存数据');
      return CacheUtil.get(cacheKey);
    }
    
    try {
      // 调用API层获取数据
      const data = await getIP();
      
      // 存入缓存，设置5分钟过期时间
      CacheUtil.set(cacheKey, data, 5 * 60 * 1000);
      
      console.log('获取并缓存新的IP信息');
      return data;
    } catch (error) {
      console.error('获取IP信息失败:', error);
      // 如果请求失败但有缓存，返回缓存数据
      if (CacheUtil.has(cacheKey)) {
        console.log('请求失败，返回缓存数据');
        return CacheUtil.get(cacheKey);
      }
      // 没有缓存则抛出错误
      throw error;
    }
  }
  
  /**
   * 清除IP信息缓存
   */
  clearIPCache() {
    const cacheKey = CacheUtil.generateKey('ip_info');
    CacheUtil.remove(cacheKey);
    console.log('IP信息缓存已清除');
  }
  
  /**
   * 检查缓存状态
   * @returns 缓存状态信息
   */
  checkCacheStatus() {
    const cacheKey = CacheUtil.generateKey('ip_info');
    return {
      hasCache: CacheUtil.has(cacheKey),
      cacheKey
    };
  }
}

// 导出单例实例
export default new RollService();