<script setup>
import { webSource } from '@/datas/search.data'
import { useEventListener } from '@/hooks'
import { useHomeStore, useSearchStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import CurrentTime from './currentTime.vue'
import SearchBefore from './searchBefore.vue'
import SearchRecommend from './searchRecommend.vue'
const searchStore = useSearchStore()
const homeStore = useHomeStore()
const { tabIndex } = storeToRefs(homeStore)
const { searchFocus, openMode, currentWebIndex } = storeToRefs(searchStore)
function getTranslate(item) {
  // 参考url
  // https://fanyi.baidu.com/mtpe-individual/transText?query=I%20don%27t%20know&lang=en2zh#/
  // https://fanyi.baidu.com/mtpe-individual/transText#/zh/en/%E4%B8%BA%E4%BB%80%E4%B9%88
  const BASE_URL = 'https://fanyi.baidu.com/mtpe-individual/transText'
  const chineseCharRegex = /[\u4e00-\u9fa5\u3400-\u4dbf\u{20000}-\u{2a6df}]/u
  const fromLang = chineseCharRegex.test(item.value) ? 'en' : 'zh'

  const encodedText = encodeURIComponent(item.value)
  const hash = `#/auto/${fromLang}/${encodedText}`
  return BASE_URL + hash
}
const searchValue = ref('')

const handleValue = computed(() => {
  const value = searchValue.value.trim()
  if (!value) return ''
  return encodeURIComponent(value)
})
const handleFocus = () => {
  searchFocus.value = true
}

// 当前选中的搜索源
const currentSource = computed(() => {
  return webSource.value[currentWebIndex.value]
})

// 下拉菜单显示状态
const sourceMenuOpen = ref(false)
// 实现搜索源的跳转
const goSearch = (item) => {
  if (!handleValue.value) return
  let url
  item.value = handleValue.value
  if (item.type === '翻译') {
    url = getTranslate(item)
  } else {
    url = item.url.replace('%s', handleValue.value)
  }
  item.url = url
  window.open(url, openMode.value)

  searchStore.addSearchHistory(item)
}
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
  return tabIndex.value === 0 ? 'translate-y-32' : 'translate-y-12'
})
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
      class="translate translate h-10 rounded-xl shadow-xl flex items-center transition-all duration-300"
      :class="[
        // searchFocus ? 'bg-[#ffffffe6]' : 'bg-[#ffffff40] hover:bg-[#fff9]',
        searchFocus ? 'bg-sf-basic' : 'bg-sf-transparent-4 hover:bg-sf-transparent-2',
        searchFocus ? 'w-[650px]' : 'w-[230px] hover:w-[650px]',
      ]"
      style="backdrop-filter: blur(10px) saturate(1.5)"
    >
      <div v-if="searchFocus" class="source-selector left-2 absolute top-1/2 z-10 -translate-y-1/2">
        <div
          class="sf-theme h-7 rounded-lg px-2 text-xs font-medium hover:shadow-md relative flex cursor-pointer items-center overflow-hidden transition-all duration-300"
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
      <div v-if="searchFocus" class="right-2 absolute top-1/2 z-10 flex -translate-y-1/2">
        <SfIcon
          v-if="handleValue"
          icon="fluent:dismiss-24-regular"
          class="h-6 w-6"
          size="8"
          @click.stop="clearSearch"
        />
        <SfIcon
          icon="fluent:search-24-regular"
          class="ml-1 h-6 w-6"
          size="8"
          @click="goSearch(currentSource)"
        />
      </div>
      <SfInput
        v-model="searchValue"
        placeholder="开始搜索"
        :autofocus="false"
        :clearable="false"
        @keyup.enter="goSearch(currentSource)"
        @focus="handleFocus"
        class="translate h-10 rounded-lg text-white relative bg-transparent"
        :class="searchFocus ? 'px-22' : ''"
      >
      </SfInput>
    </div>

    <!-- 搜索结果/历史区域 -->
    <div
      v-if="searchFocus"
      class="mt-1 rounded-xl border-blue-100 bg-white p-3 shadow-lg z-30 flex w-[650px] flex-col border"
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
