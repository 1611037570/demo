/**
 * 通用缓存工具类
 * 用于管理API请求的缓存数据
 */
interface CacheItem {
  data: any;
  timestamp: number;
  expireTime: number;
}

export class CacheUtil {
  private static cache: Map<string, CacheItem> = new Map();
  private static defaultExpireTime = 5 * 60 * 1000; // 默认5分钟过期

  /**
   * 设置缓存
   * @param key 缓存键名
   * @param data 缓存数据
   * @param expireTime 过期时间（毫秒），默认5分钟
   */
  static set(key: string, data: any, expireTime: number = this.defaultExpireTime): void {
    const cacheItem: CacheItem = {
      data,
      timestamp: Date.now(),
      expireTime
    };
    this.cache.set(key, cacheItem);
    this.cleanExpired(); // 清理过期缓存
  }

  /**
   * 获取缓存
   * @param key 缓存键名
   * @returns 缓存数据，如果不存在或已过期则返回null
   */
  static get(key: string): any | null {
    const cacheItem = this.cache.get(key);
    if (!cacheItem) return null;

    // 检查是否过期
    if (Date.now() - cacheItem.timestamp > cacheItem.expireTime) {
      this.cache.delete(key);
      return null;
    }

    return cacheItem.data;
  }

  /**
   * 清除指定缓存
   * @param key 缓存键名
   */
  static remove(key: string): void {
    this.cache.delete(key);
  }

  /**
   * 清除所有缓存
   */
  static clear(): void {
    this.cache.clear();
  }

  /**
   * 检查缓存是否存在且有效
   * @param key 缓存键名
   * @returns 是否有效
   */
  static has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * 清理所有过期的缓存
   */
  private static cleanExpired(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.expireTime) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * 生成缓存键名
   * @param prefix 前缀
   * @param params 参数对象
   * @returns 生成的缓存键名
   */
  static generateKey(prefix: string, params?: Record<string, any>): string {
    const paramsStr = params ? JSON.stringify(params) : '';
    return `${prefix}:${paramsStr}`;
  }
}

export default CacheUtil;