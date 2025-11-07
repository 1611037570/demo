<script setup>
import { webSource } from '@/datas/search.data'
import { useEventListener } from '@/hooks'
import { useHomeStore, useSearchStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import CurrentTime from './currentTime.vue'
import SearchBefore from './searchBefore.vue'
import SearchInput from './searchInput.vue'
import SearchRecommend from './searchRecommend.vue'

const searchStore = useSearchStore()
const homeStore = useHomeStore()
const { tabIndex } = storeToRefs(homeStore)

const {
  searchFocus,
  expressionsFlag,
  expressionsResult,
  expressionsVisible,
  currentWebIndex,
  handleValue,
  webSourceListVisible,
} = storeToRefs(searchStore)

// 切换搜索源
const changeSource = (source) => {
  currentWebIndex.value = webSource.value.indexOf(source)
  webSourceListVisible.value = false
}

// 处理点击外部关闭搜索源下拉菜单和管理搜索焦点
const handleOutsideClick = (e) => {
  const sourceElement = e.target.closest('.source-selector')
  const menuElement = e.target.closest('.source-dropdown')

  // 关闭下拉菜单的逻辑
  if (webSourceListVisible.value && !sourceElement && !menuElement) {
    webSourceListVisible.value = false
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

// 监听点击外部事件
useEventListener(document, 'click', handleOutsideClick)

const translateYClass = computed(() => {
  if (!init.value) {
    return 'translate-y-0'
  }
  return tabIndex.value === 0 ? 'translate-y-34' : 'translate-y-12'
})

const init = ref(false)
setTimeout(() => {
  init.value = true
}, 1)
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
        v-if="webSourceListVisible"
        class="source-dropdown mt-3 left-0 rounded-xl border-blue-100 bg-white shadow-lg absolute top-full z-90 w-[220px] overflow-hidden border"
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
    <SearchInput />

    <!-- 搜索结果/历史区域 -->
    <div
      v-if="searchFocus"
      class="mt-3 rounded-2xl border-blue-100 p-3 shadow-lg left-0 absolute top-full z-30 flex w-[590px] transform flex-col border bg-sf-primary transition-all duration-300"
    >
      <template v-if="expressionsVisible">
        <div class="text-sm flex items-center justify-center">
          <div v-if="expressionsFlag && handleValue" class="text-green-500">
            计算结果：<span class="font-bold">
              {{ expressionsResult }}
            </span>
          </div>
          <template v-else-if="!expressionsFlag && handleValue">
            <span class="text-red-500 font-bold">表达式错误</span>
          </template>
          <div v-else class="text-sf-theme">输入公式开始逆转时空吧~</div>
        </div>
      </template>
      <!-- 搜索建议 -->
      <SearchRecommend v-else-if="handleValue" />
      <!-- 搜索历史 -->
      <SearchBefore v-else />
      <div class="mt-3 text-xs text-center">了解搜索框功能</div>
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
