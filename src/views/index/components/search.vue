<script setup>
import { ref } from 'vue'

function translate(text) {
  // 参考url
  // https://fanyi.baidu.com/mtpe-individual/transText?query=I%20don%27t%20know&lang=en2zh#/
  // https://fanyi.baidu.com/mtpe-individual/transText#/zh/en/%E4%B8%BA%E4%BB%80%E4%B9%88
  const BASE_URL = 'https://fanyi.baidu.com/mtpe-individual/transText'
  const chineseCharRegex = /[\u4e00-\u9fa5\u3400-\u4dbf\u{20000}-\u{2a6df}]/u
  const fromLang = chineseCharRegex.test(text) ? 'en' : 'zh'

  const encodedText = encodeURIComponent(text)
  const hash = `#/auto/${fromLang}/${encodedText}`

  window.open(BASE_URL + hash)
}
const searchText = ref('')

const handleSearch = () => {
  window.open('https://www.baidu.com/s?ie=utf-8&wd=' + searchText.value)
}
const selectedTime = ref('')
</script>

<template>
  <div class="h-12 w-[680px] my-12 flex flex-col mx-auto">
    <el-time-picker
      style="width: 120px"
      v-model="selectedTime"
      format="HH:mm"
      value-format="HH:mm"
      placeholder="选择时间"
    ></el-time-picker>
    <div class="flex w-full">
      <div class="flex flex-1">
        <sf-input
          v-model="searchText"
          placeholder="请输入搜索内容"
          clearable
          @keyup.enter="handleSearch"
        ></sf-input>
      </div>
      <div
        class="h-12 w-24 flex items-center justify-center bg-[#409eff] text-white cursor-pointer rounded-r-lg"
        @click="handleSearch"
      >
        搜索
      </div>
    </div>
    <div v-if="searchText" class="w-full bg-amber-200" @click="translate(searchText)">
      翻译：{{ searchText }}
    </div>
  </div>
</template>
<style scoped></style>
