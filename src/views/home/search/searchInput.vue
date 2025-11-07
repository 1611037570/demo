<template>
  <div
    class="translate translate h-10 rounded-3xl shadow-3xl relative flex items-center transition-all duration-300"
    :class="[
      searchFocus ? 'bg-sf-primary' : 'bg-sf-transparent-2 hover:bg-sf-transparent',
      searchFocus ? 'w-[590px]' : 'w-[230px] hover:w-[590px]',
    ]"
    style="backdrop-filter: blur(10px) saturate(1.5)"
  >
    <div v-if="searchFocus" class="source-selector left-2 absolute top-1/2 z-10 -translate-y-1/2">
      <SfTooltip
        v-if="expressionsVisible"
        :info="
          expressionsLock
            ? '按tab或点击解锁，计算结果将自动显示'
            : '按tab或点击锁定，计算结果将持续显示'
        "
      >
        <SfIcon
          @click="expressionsLock = !expressionsLock"
          size="6"
          :icon="expressionsLock ? 'stash:lock-closed' : 'stash:lock-opened'"
        />
      </SfTooltip>
      <div
        v-else
        class="flex-center sf-theme-element h-7 rounded-xl px-2 text-xs font-medium hover:shadow-md overflow-hidden transition-all duration-300"
        @click.stop="toggleSourceMenu"
      >
        <div class="flex items-center justify-center">
          <el-image :src="currentSource.icon" class="mr-1.5 h-4 w-4"></el-image>
          <span>{{ currentSource.type }}</span>
          <svg
            class="ml-1.5 h-3 w-3 transition-transform duration-200"
            :class="{ 'rotate-180': webSourceListVisible }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    <div
      v-if="searchFocus"
      class="right-3 absolute top-1/2 z-10 flex -translate-y-1/2 items-center"
    >
      <SfTooltip info="按del或点击删除内容" v-if="handleValue" class="mr-1">
        <SfIcon icon="carbon:close-outline" size="6" @click.stop="clearSearch" />
      </SfTooltip>

      <SfTooltip
        v-if="expressionsVisible && handleValue"
        :info="expressionsLock ? '按回车或点击复制结果' : '按回车或点击搜索内容'"
      >
        <SfIcon
          icon="famicons:copy-outline"
          class="hover:text-sf-theme"
          size="6"
          @click="getResult"
        />
      </SfTooltip>
      <SfTooltip v-else-if="!expressionsVisible" info="按回车或点击搜索内容">
        <SfIcon icon="mynaui:search" class="hover:text-sf-theme" size="7" @click="getResult" />
      </SfTooltip>
    </div>
    <SfInput
      v-model="searchValue"
      :placeholder="placeholder"
      :autofocus="false"
      :clearable="false"
      @keyup.enter="getResult"
      @focus="handleFocus"
      class="translate h-10 rounded-lg text-white relative bg-transparent"
      :class="searchFocus ? 'px-22' : ''"
    >
    </SfInput>
  </div>
</template>

<script setup>
import { webSource } from '@/datas/search.data'
import { useSearchStore } from '@/stores'
import { useEventListener } from '@vueuse/core'

import { evaluate, parse } from 'mathjs'

const searchStore = useSearchStore()
const { search } = searchStore
const {
  searchFocus,
  searchValue,
  currentWebIndex,
  handleValue,
  currentIndex,
  expressionsFlag,
  expressionsResult,
  expressionsLock,
  expressionsVisible,
  webSourceListVisible,
} = storeToRefs(searchStore)

// 表达式计算
function expressionsComputed() {
  const value = String(searchValue.value)
  try {
    parse(value)
    const res = evaluate(value)
    // 在有小数的时候才保留两位小数
    const resFixed = Number.isInteger(res) ? res : res.toFixed(2)
    expressionsResult.value = resFixed
    console.log('resFixed', resFixed)
    expressionsFlag.value = true
  } catch (err) {
    console.log('err', err)
    expressionsFlag.value = false
  }
}
// 显示/隐藏搜索源下拉菜单
const toggleSourceMenu = () => {
  webSourceListVisible.value = !webSourceListVisible.value
}
// 当前选中的搜索源
const currentSource = computed(() => {
  return webSource.value[currentWebIndex.value]
})

// 监听搜索输入变化，重置当前索引
watch(
  () => searchValue.value,
  () => {
    expressionsComputed()
    currentIndex.value = -1
  },
)

const { copy } = useClipboard({
  legacy: false,
})
function getResult() {
  if (expressionsVisible.value) {
    copy(expressionsResult.value)
    ElMessage.success('复制成功')
    return
  }
  search(currentSource.value)
}

// 清空搜索输入
function clearSearch() {
  searchValue.value = ''
}

function handleFocus() {
  searchFocus.value = true
}

// 计数变量，初始值 0
const count = ref(0)
const target = '开始搜索...'
const placeholder = ref('')
const { pause } = useIntervalFn(
  () => {
    // 每次执行先累加计数
    placeholder.value += target[count.value]
    count.value++
    // 核心逻辑：计数达到60时停止定时器
    if (count.value >= target.length) {
      // 调用 pause 方法停止（用 ?. 避免初始状态下的 null 调用错误）
      pause()
      return // 停止后直接返回，避免后续无效操作
    }
  },
  140,
  {
    immediate: true,
  },
)

// 监听tab切换
useEventListener(document, 'keydown', (e) => {
  // tab事件
  if (e.key === 'Tab') {
    if (searchFocus.value && expressionsFlag.value) {
      e.preventDefault()
      expressionsLock.value = !expressionsLock.value
      return
    }

    if (searchFocus.value) {
      e.preventDefault()
      // 获取容器元素
      const sourceSelector = document.querySelector('.source-selector .search-source-item')
      if (sourceSelector) {
        // 触发CSS动画的类
        sourceSelector.classList.add('tab-transition-active')

        // 切换到下一个搜索源下标
        const nextIndex = (currentWebIndex.value + 1) % webSource.value.length

        // 动画完成后移除触发类
        setTimeout(() => {
          sourceSelector.classList.remove('tab-transition-active')
        }, 300)

        // 在动画中间点切换内容，确保上下滑动效果协调
        setTimeout(() => {
          // 只更新下标，由计算属性自动更新 currentSource
          currentWebIndex.value = nextIndex
        }, 150)
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
