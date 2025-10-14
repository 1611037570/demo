import dayjs from 'dayjs'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

// 倒计时目标时间配置项
interface TimeOptions {
  year?: number | null
  month?: number | null
  day?: number | null
  hour?: number
  minute?: number
  second?: number
}

// 剩余时间结构
interface TimeLeft {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

export const useCountdown = (options: TimeOptions = {}) => {
  // 合并默认配置（默认每天17:30:00）
  const defaultOptions = {
    hour: 17,
    minute: 30,
    second: 0,
    ...options,
  }

  // 当前时间（dayjs对象）
  const currentTime = ref(dayjs())
  const isCompleted = ref(false) // 倒计时是否已完成

  // 计算目标时间
  const targetDateTime = computed(() => {
    const now = dayjs()
    return dayjs()
      .year(defaultOptions.year ?? now.year())
      .month(defaultOptions.month ? defaultOptions.month - 1 : now.month())
      .date(defaultOptions.day ?? now.date())
      .hour(defaultOptions.hour)
      .minute(defaultOptions.minute)
      .second(defaultOptions.second)
  })

  // 计算剩余时间
  const timeLeft = computed<TimeLeft>(() => {
    const now = currentTime.value
    const target = targetDateTime.value

    if (now.isAfter(target)) {
      isCompleted.value = true
      return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    isCompleted.value = false

    const units: any = [
      { name: 'years', unit: 'year' },
      { name: 'months', unit: 'month' },
      { name: 'days', unit: 'day' },
      { name: 'hours', unit: 'hour' },
      { name: 'minutes', unit: 'minute' },
      { name: 'seconds', unit: 'second' },
    ]

    let tempTarget = target.clone()
    const result: any = {}

    for (const { name, unit } of units) {
      const value = Math.floor(tempTarget.diff(now, unit, true))
      result[name] = value
      tempTarget = tempTarget.subtract(value, unit)
    }

    return result
  })

  // 格式化当前时间
  const time = computed(() => currentTime.value.format('HH:mm:ss'))
  const date = computed(() => currentTime.value.format('YYYY/MM/DD'))

  // 主更新逻辑：同步当前时间
  const update = () => {
    currentTime.value = dayjs()
  }

  // 动画帧回调：基于时间戳差值控制每秒更新
  let rafId: number | null = null
  let lastUpdateTime = 0 // 记录上一次更新的时间戳

  const tick = (timestamp: number) => {
    // 首次触发时初始化基准时间戳
    if (!lastUpdateTime) {
      lastUpdateTime = timestamp
    }

    // 当时间差≥1000ms时更新（确保每秒一次）
    if (timestamp - lastUpdateTime >= 1000) {
      update()
      lastUpdateTime = timestamp // 重置基准时间戳
    }

    // 未完成时继续请求下一帧
    if (!isCompleted.value) {
      rafId = requestAnimationFrame(tick)
    }
  }

  // 启动计时器
  const startTimer = () => {
    stopTimer() // 清除可能的旧任务
    lastUpdateTime = 0 // 重置基准时间戳
    rafId = requestAnimationFrame(tick)
  }

  // 停止计时器
  const stopTimer = () => {
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }

  // 生命周期管理
  onMounted(() => {
    update() // 初始化数据
    startTimer()
  })

  onBeforeUnmount(stopTimer)

  return {
    timeLeft,
    isCompleted,
    time,
    date,
    targetDateTime,
  }
}
