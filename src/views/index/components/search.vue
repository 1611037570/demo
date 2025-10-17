<script setup>
import { useIndexStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
const indexStore = useIndexStore()
const { searchFocus } = storeToRefs(indexStore)
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
}
const searchText = ref('')

function githubSearch() {
  window.open(
    'https://github.com/search?q=' + encodeURIComponent(searchText.value) + '&type=repositories',
  )
}
// 文心一言搜索
function aiSearch() {
  window.open('https://chat.baidu.com/search?word=' + encodeURIComponent(searchText.value))
}

const handleSearch = () => {
  window.open('https://www.baidu.com/s?ie=utf-8&wd=' + searchText.value)
}
const handleFocus = () => {
  searchFocus.value = true
}
const handleBlur = () => {
  searchFocus.value = false
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
</script>

<template>
  <div class="h-12 w-[680px] my-12 flex flex-col mx-auto">
    <div class="flex w-full">
      <div class="flex flex-1">
        <sf-input
          v-model="searchText"
          placeholder="请输入搜索内容"
          clearable
          @keyup.enter="handleSearch"
          @focus="handleFocus"
          @blur="handleBlur"
        ></sf-input>
      </div>
      <div
        class="h-12 w-24 flex items-center justify-center bg-[#409eff] text-white cursor-pointer rounded-r-lg"
        @click="handleSearch"
      >
        搜索
      </div>
    </div>
    <div v-if="searchText && searchFocus" class="w-full bg-amber-200 flex flex-col z-30 p-3">
      <div
        @click="item.fn"
        v-for="item in list"
        :key="item.name"
        class="p-3 cursor-pointer hover:bg-[#e5e5e5] whitespace-nowrap overflow-hidden text-ellipsis"
      >
        {{ item.name }}：{{ searchText }}
      </div>
    </div>
  </div>
</template>
<style scoped></style>
