<template>
  <div @click="updateQuote" class="mx-auto px-6 mb-8 cursor-pointer">
    <div
      class="relative p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 text-gray-700 hover:text-blue-400"
    >
      <!-- 引言引号图标 -->
      <div class="absolute top-2 left-2 opacity-20 text-4xl text-blue-400">
        <sf-icon icon="fluent:quote-left" />
      </div>

      <p class="relative z-10 text-center text-lg transition-all duration-300">
        {{ quote }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { getRandomQuote } from '@/utils/getRandomQuote'
import { ref } from 'vue'

// 引言内容
const quote = ref('愿这份简历 能把你带到想去的地方！')

// 更新引言的方法
const updateQuote = () => {
  quote.value = getRandomQuote()
}
</script>

<style scoped>
/* 可以在这里添加一些自定义的CSS动画效果 */
</style>
