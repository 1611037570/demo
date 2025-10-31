<script setup>
import { webSource } from '@/datas/search.data'
import { useEventListener } from '@/hooks'
import { useHomeStore, useSearchStore } from '@/stores'
import { useIntervalFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import CurrentTime from './currentTime.vue'
import SearchBefore from './searchBefore.vue'
import SearchRecommend from './searchRecommend.vue'
const searchStore = useSearchStore()
const homeStore = useHomeStore()
const { tabIndex } = storeToRefs(homeStore)
const { search } = searchStore
const { searchFocus, searchValue, currentWebIndex, handleValue } = storeToRefs(searchStore)

// 当前选中的搜索源
const currentSource = computed(() => {
  return webSource.value[currentWebIndex.value]
})

// 下拉菜单显示状态
const sourceMenuOpen = ref(false)

// 切换搜索源
const changeSource = (source) => {
  currentWebIndex.value = webSource.value.indexOf(source)
  sourceMenuOpen.value = false
}
// 显示/隐藏搜索源下拉菜单
const toggleSourceMenu = () => {
  sourceMenuOpen.value = !sourceMenuOpen.value
}
// 处理点击外部关闭搜索源下拉菜单和管理搜索焦点
const handleOutsideClick = (e) => {
  const sourceElement = e.target.closest('.source-selector')
  const menuElement = e.target.closest('.source-dropdown')

  // 关闭下拉菜单的逻辑
  if (sourceMenuOpen.value && !sourceElement && !menuElement) {
    sourceMenuOpen.value = false
  }

  // 处理搜索焦点的逻辑 - 只有点击非相关元素时才关闭焦点
  const isSearchRelated = e.target.closest('.search-container') || sourceElement || menuElement

  // 延迟设置，确保其他点击事件先执行
  setTimeout(() => {
    if (!isSearchRelated) {
      searchFocus.value = false
    }
  }, 100)
}

// 监听tab切换
useEventListener(document, 'keydown', (e) => {
  if (!searchFocus.value) return
  if (e.key === 'Tab') {
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
})

// 清空搜索输入
const clearSearch = () => {
  searchValue.value = ''
}
// 监听点击外部事件
useEventListener(document, 'click', handleOutsideClick)

const init = ref(false)
setTimeout(() => {
  init.value = true
}, 1)
const translateYClass = computed(() => {
  if (!init.value) {
    return 'translate-y-0'
  }
  return tabIndex.value === 0 ? 'translate-y-34' : 'translate-y-12'
})

const handleFocus = () => {
  searchFocus.value = true
}

// 计数变量，初始值 0
const count = ref(0)
const target = '开始搜索...'
const placeholder = ref('')
// 定义定时器逻辑：每 1000ms 计数+1，到60停止
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
</script>

<template>
  <div
    class="search-container group translate fixed left-1/2 z-60 flex -translate-x-1/2 flex-col items-center transition-all duration-300"
    :class="[translateYClass]"
  >
    <CurrentTime />
    <!-- 搜索源下拉菜单（移到最顶层，确保正确层级） -->
    <transition name="dropdown" appear>
      <div
        v-if="sourceMenuOpen"
        class="source-dropdown left-3 mt-1 rounded-xl border-blue-100 bg-white shadow-lg absolute top-full z-60 w-[220px] overflow-hidden border"
      >
        <div class="p-2">
          <div
            v-for="source in webSource"
            :key="source.type"
            class="group rounded-md px-3 py-2.5 text-sm hover:bg-blue-50 hover:pl-4 flex cursor-pointer items-center transition-all duration-200"
            @click.stop="changeSource(source)"
          >
            <el-image
              v-if="source.icon"
              :src="source.icon"
              class="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110"
            ></el-image>
            <span class="group-hover:text-blue-600 transition-colors duration-200">{{
              source.type
            }}</span>
          </div>
        </div>
      </div>
    </transition>
    <!-- 搜索框和按钮 -->
    <!-- 黑夜主题暂未启用 :class="[searchFocus ? 'bg-[#1e1e1ee6] ' : 'group-hover:bg-[#0f0f0f99] bg-[#00000059]']" -->
    <div
      class="translate translate h-10 rounded-3xl shadow-3xl flex items-center transition-all duration-300"
      :class="[
        // searchFocus ? 'bg-[#ffffffe6]' : 'bg-[#ffffff40] hover:bg-[#fff9]',
        searchFocus ? 'bg-sf-primary' : 'bg-sf-transparent-2 hover:bg-sf-transparent',
        searchFocus ? 'w-[590px]' : 'w-[230px] hover:w-[590px]',
      ]"
      style="backdrop-filter: blur(10px) saturate(1.5)"
    >
      <div v-if="searchFocus" class="source-selector left-2 absolute top-1/2 z-10 -translate-y-1/2">
        <div
          class="sf-theme h-7 rounded-xl px-2 text-xs font-medium hover:shadow-md relative flex cursor-pointer items-center overflow-hidden transition-all duration-300"
          @click.stop="toggleSourceMenu"
        >
          <div class="search-source-item">
            <el-image :src="currentSource.icon" class="mr-1.5 h-4 w-4"></el-image>
            <span>{{ currentSource.type }}</span>
            <svg
              class="ml-1.5 h-3 w-3 transition-transform duration-200"
              :class="{ 'rotate-180': sourceMenuOpen }"
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
        <SfIcon v-if="handleValue" icon="carbon:close-outline" size="6" @click.stop="clearSearch" />
        <SfIcon icon="mynaui:search" class="ml-1" size="7" @click="search(currentSource)" />
      </div>
      <SfInput
        v-model="searchValue"
        :placeholder="placeholder"
        :autofocus="false"
        :clearable="false"
        @keyup.enter="search(currentSource)"
        @focus="handleFocus"
        class="translate h-10 rounded-lg text-white relative bg-transparent"
        :class="searchFocus ? 'px-22' : ''"
      >
      </SfInput>
    </div>

    <!-- 搜索结果/历史区域 -->
    <div
      v-if="searchFocus"
      class="mt-3 rounded-2xl border-blue-100 p-3 shadow-lg z-30 flex w-[590px] transform flex-col border bg-sf-primary transition-all duration-300"
    >
      <!-- 搜索建议 -->
      <SearchRecommend v-if="handleValue" />
      <!-- 搜索历史 -->
      <SearchBefore v-else />
    </div>
  </div>
</template>

<style scoped>
/* 下拉菜单过渡动画 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
  transform-origin: top left;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-4px);
}

/* 确保Tab切换时也有过渡效果 */
.source-dropdown {
  transition: all 0.3s ease;
}

/* 搜索源项目容器 */
.search-source-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
}

/* 使用CSS实现完整的Tab切换动画 */
.search-source-item.tab-transition-active {
  animation: tabSlideTransition 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

/* 定义完整的上下滑动切换动画 */
@keyframes tabSlideTransition {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(-100%);
    opacity: 0;
  }
  51% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

:deep(.el-input__wrapper) {
  background-color: transparent !important;
}
:deep(.el-input__inner) {
  text-align: center !important;
}
</style>
