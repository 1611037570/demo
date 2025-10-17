<script setup>
import { useIndexStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
const indexStore = useIndexStore()
const { searchFocus, searchHistory, searchHistoryDisabled } = storeToRefs(indexStore)
function translateSearch() {
  // 参考url
  // https://fanyi.baidu.com/mtpe-individual/transText?query=I%20don%27t%20know&lang=en2zh#/
  // https://fanyi.baidu.com/mtpe-individual/transText#/zh/en/%E4%B8%BA%E4%BB%80%E4%B9%88
  const BASE_URL = 'https://fanyi.baidu.com/mtpe-individual/transText'
  const chineseCharRegex = /[\u4e00-\u9fa5\u3400-\u4dbf\u{20000}-\u{2a6df}]/u
  const fromLang = chineseCharRegex.test(searchText.value) ? 'en' : 'zh'

  const encodedText = encodeURIComponent(searchText.value)
  const hash = `#/auto/${fromLang}/${encodedText}`
  window.open(BASE_URL + hash)
  addSearchHistory()
}
const searchText = ref('')
function addSearchHistory() {
  if (searchText.value) {
    searchHistory.value.push(searchText.value)
  }
}
function githubSearch() {
  window.open(
    'https://github.com/search?q=' + encodeURIComponent(searchText.value) + '&type=repositories',
  )
  addSearchHistory()
}
// 文心一言搜索
function aiSearch() {
  window.open('https://chat.baidu.com/search?word=' + encodeURIComponent(searchText.value))
  addSearchHistory()
}

const handleSearch = (text) => {
  const currentText = text || searchText.value
  console.log('currentText', currentText)

  if (!currentText) return
  window.open('https://www.baidu.com/s?ie=utf-8&wd=' + encodeURIComponent(currentText))
  // 自定义传入文本时，不添加到历史记录
  if (!text) {
    addSearchHistory()
  }
}
const handleFocus = () => {
  searchFocus.value = true
}
const handleBlur = () => {
  setTimeout(() => {
    searchFocus.value = false
  }, 200)
}

const list = ref([
  {
    name: '文心一言',
    fn: aiSearch,
  },
  {
    name: '翻译',
    fn: translateSearch,
  },
  {
    name: 'github',
    fn: githubSearch,
  },
])

const openFn = (item) => {
  item.fn()
  console.log('openFn', item.fn)
}
</script>

<template>
  <div class="h-12 w-[680px] my-12 flex flex-col mx-auto">
    <div class="flex w-full">
      <div class="flex flex-1">
        <sf-input
          v-model="searchText"
          placeholder="请输入搜索内容"
          clearable
          @keyup.enter="handleSearch(searchText)"
          @focus="handleFocus"
          @blur="handleBlur"
        ></sf-input>
      </div>
      <div
        class="h-12 w-24 flex items-center justify-center bg-[#409eff] text-white cursor-pointer rounded-r-lg"
        @click="handleSearch(searchText)"
      >
        搜索
      </div>
    </div>
    <div
      v-if="searchFocus"
      class="w-full bg-white rounded-lg shadow-lg border border-blue-100 flex flex-col z-30"
    >
      <!-- 搜索建议 -->
      <template v-if="searchText">
        <div
          @click="openFn(item)"
          v-for="item in list"
          :key="item.name"
          class="px-4 py-3 cursor-pointer hover:bg-blue-50 whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-200"
        >
          <span class="font-medium text-blue-600">{{ item.name }}</span>
          <span class="text-gray-600 ml-2">：{{ searchText }}</span>
        </div>
      </template>
      <!-- 搜索历史 -->
      <div
        class="p-3 flex flex-wrap gap-2"
        v-else-if="!searchHistoryDisabled && searchHistory.length"
      >
        <div class="text-sm text-gray-500 w-full mb-1">搜索历史：</div>
        <div
          @click="handleSearch(item)"
          v-for="(item, index) in searchHistory"
          :key="index"
          class="bg-blue-50 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-blue-100 whitespace-nowrap transition-colors duration-200 text-sm"
        >
          {{ item }}
          <span
            class="text-gray-400 cursor-pointer ml-1 hover:text-red-400 transition-colors duration-200"
            @click.stop="removeHistory(index)"
            >×</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
