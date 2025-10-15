import dayjs from 'dayjs'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

// 目标时间配置项
interface TimeOptions {
  year?: number | null // 具体年份（如2024），null则随当前年
  month?: number | null // 月份（1-12），null则随当前月
  day?: number | null // 日期（1-31），null则随当前日
  hour?: number // 小时（0-23，默认17）
  minute?: number // 分钟（0-59，默认30）
  second?: number // 秒（0-59，默认0）
}

// 剩余时间结构（包含剩余时间+当前日期+当前时间）
interface TimeLeft {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
  date: string // 格式：YYYY/MM/DD
  time: string // 格式：HH:mm:ss
}

export const useCountdown = (options: TimeOptions = {}) => {
  // 合并配置（确保默认值安全）
  const opts = {
    hour: 17,
    minute: 30,
    second: 0,
    year: options.year ?? null,
    month: options.month ?? null,
    day: options.day ?? null,
  }

  const currentTime = ref(dayjs())
  const isCompleted = ref(false)

  // 计算目标时间
  const targetDateTime = computed(() => {
    const now = dayjs(currentTime.value)
    let target = dayjs()
      .year(opts.year ?? now.year())
      .month(opts.month != null ? opts.month - 1 : now.month())
      .date(opts.day ?? now.date())
      .hour(opts.hour)
      .minute(opts.minute)
      .second(opts.second)

    const endOfDay = target.endOf('day')
    if (now.isAfter(endOfDay)) {
      const hasFixedYear = typeof opts.year === 'number'
      const hasFixedMonthDay = typeof opts.month === 'number' && typeof opts.day === 'number'
      const hasFixedDay = typeof opts.day === 'number'

      if (!hasFixedYear) {
        if (hasFixedMonthDay) {
          target = target.add(1, 'year')
        } else if (hasFixedDay) {
          const nextMonth = target.add(1, 'month')
          const maxDate = nextMonth.daysInMonth()
          target = nextMonth.date(Math.min(opts.day, maxDate))
        } else {
          target = target.add(1, 'day')
        }
      }
    }
    return target
  })

  // 整合剩余时间、当前日期和时间
  const timeLeft = computed<TimeLeft>(() => {
    const now = dayjs(currentTime.value)
    const target = targetDateTime.value
    const endOfDay = target.endOf('day')

    // 完成状态判断
    const isPermanentDone = typeof opts.year === 'number' && now.isAfter(target)
    const isTodayDone =
      !isPermanentDone && now.isSameOrAfter(target) && now.isSameOrBefore(endOfDay)

    if (isPermanentDone || isTodayDone) {
      isCompleted.value = true
      return {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }

    isCompleted.value = false

    // 计算剩余时间
    const units: Array<{
      name: keyof Omit<TimeLeft, 'date' | 'time'>
      unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'
    }> = [
      { name: 'years', unit: 'year' },
      { name: 'months', unit: 'month' },
      { name: 'days', unit: 'day' },
      { name: 'hours', unit: 'hour' },
      { name: 'minutes', unit: 'minute' },
      { name: 'seconds', unit: 'second' },
    ]

    let tempTarget = target.clone()
    const result: Omit<TimeLeft, 'date' | 'time'> = {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }

    for (const { name, unit } of units) {
      result[name] = Math.floor(tempTarget.diff(now, unit, true))
      tempTarget = tempTarget.subtract(result[name], unit)
    }

    return result
  })

  // 计时器逻辑（修复ESLint和类型问题）
  let rafId: number | null = null
  let lastTimestamp = 0

  const updateTime = () => {
    currentTime.value = dayjs()
  }

  const tick = (timestamp: number) => {
    if (!lastTimestamp) {
      lastTimestamp = timestamp
    }

    if (timestamp - lastTimestamp >= 1000) {
      updateTime()
      lastTimestamp = timestamp
    }

    if (!isCompleted.value) {
      rafId = requestAnimationFrame(tick)
    }
  }

  // 修复ESLint错误：使用明确的条件语句而非表达式
  const start = () => {
    if (rafId) {
      cancelAnimationFrame(rafId)
    }
    lastTimestamp = 0
    rafId = requestAnimationFrame(tick)
  }

  const stop = () => {
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }

  onMounted(() => {
    updateTime()
    start()
  })

  onBeforeUnmount(stop)

  return {
    timeLeft,
    isCompleted,
    targetDateTime,
    start,
    stop,
  }
}
