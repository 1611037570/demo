// 定义数据键类型
type Keys = string | string[]

// 定义数据代理选项类型
interface DataProxyOption {
  /**
   * 数据键路径
   */
  key: Keys

  /**
   * 属性名称
   */
  name: string

  /**
   * 处理类型：'emit'表示触发事件，默认表示设置数据
   */
  type?: 'emit'
}

// 创建一个类
class DataProxy {
  private data: Record<string, any> = {}
  private emit: any
  constructor(data: any, emit: any) {
    // 直接使用传入的data引用，避免可能的性能损失
    this.data = data
    this.emit = emit
  }

  // 获取数据
  getData(keys: Keys) {
    return this.select({ keys })
  }

  // 通用的数据代理辅助方法
  private createDataProxyHelper<T>(config: {
    options: DataProxyOption | DataProxyOption[]
    callback: (item: DataProxyOption) => T
  }): Record<string, T> {
    const { options, callback } = config
    const result: Record<string, T> = {}

    const optionsArray = Array.isArray(options) ? options : [options]
    const len = optionsArray.length
    // 预分配内存或直接使用for循环提升性能
    for (let i = 0; i < len; i++) {
      const item = optionsArray[i]
      result[item.name] = callback(item)
    }

    return result
  }
  private getDataCallback(item: DataProxyOption) {
    return this.getData(item.key)
  }
  // 获取数据代理
  getDataProxy(options: DataProxyOption | DataProxyOption[]) {
    return this.createDataProxyHelper({
      options,
      callback: this.getDataCallback,
    })
  }

  // 设置数据
  setData(keys: Keys, value: any) {
    this.select({ keys, value })
    // 移除生产环境不需要的console.log
  }
  setDataCallback(item: DataProxyOption) {
    return (newValue: any, ...args: any) => {
      if (item.type === 'emit') {
        console.log('emit', newValue)
        this.emit(item.name, newValue, ...args)
      } else {
        this.setData(item.key, newValue)
      }
    }
  }
  // 设置数据代理
  setDataProxy(options: DataProxyOption | DataProxyOption[]) {
    return this.createDataProxyHelper({
      options,
      callback: this.setDataCallback,
    })
  }

  // 高性能的select方法 - 统一处理数据获取与设置
  private select(options: { keys: Keys; value?: any }): any {
    const { keys, value } = options
    // 统一处理键格式为数组
    const list = Array.isArray(keys) ? keys : [keys]
    const keysLength = list.length
    let current = this.data

    for (let i = 0; i < keysLength; i++) {
      const key = list[i]
      const isLast = i === keysLength - 1
      if (isLast) {
        if (options.hasOwnProperty('value')) {
          current[key] = value
        }
        return current[key]
      }
      if (!current.hasOwnProperty(key)) {
        // 仅在需要时创建新对象
        current[key] = {}
      }
      // 移动到下一级数据
      current = current[key]
    }
  }
}
export default DataProxy
