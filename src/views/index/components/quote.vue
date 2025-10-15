<template>
  <div class="mx-auto px-4 mb-6 cursor-pointer">
    <div
      class="relative p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 text-gray-700 group"
    >
      <!-- 按钮区域 - 顶部居中，鼠标经过时显示 -->
      <div
        class="absolute top-2 left-1/2 transform -translate-x-1/2 -translate-y-2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-6 transition-all duration-300 flex gap-2 whitespace-nowrap"
      >
        <div
          @click.stop="updateQuote"
          class="px-3 py-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 text-sm flex items-center gap-1 shadow-md"
        >
          <sf-icon icon="lucide:refresh-cw" class="w-4 h-4" />
          刷新
        </div>
        <div
          class="px-3 py-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-600 text-sm flex items-center gap-1 shadow-md"
          @click.stop="toggleFavorite"
        >
          <sf-icon
            :icon="isFavorite ? 'lucide:heart' : 'lucide:heart'"
            class="w-4 h-4"
            :class="isFavorite ? 'fill-red-500 text-red-500' : ''"
          />
          收藏
        </div>
      </div>
      <p class="relative z-10 text-center text-base leading-relaxed italic py-2" s>
        {{ quote }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { getRandomQuote } from '@/utils/getRandomQuote'
import { onMounted, ref } from 'vue'

// 引言内容
const quote = ref('愿这份简历 能把你带到想去的地方！')
// 收藏状态
const isFavorite = ref(false)

// 更新引言的方法
const updateQuote = () => {
  quote.value = getRandomQuote()
  // 切换引言时取消收藏状态
  isFavorite.value = false
}

// 切换收藏状态
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

onMounted(() => {
  // updateQuote()
})
</script>

<style scoped></style>
