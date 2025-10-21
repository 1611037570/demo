<script setup lang="ts">
import { classToggle as vClassToggle } from '@/directives/classToggle'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'

const searchStore = useSearchStore()
const { searchFocus } = storeToRefs(searchStore)
// 切换searchFocus状态的函数
function toggleSearchFocus() {
  searchStore.setSearchFocus(!searchFocus.value)
}

// // 在组件内部注册自定义指令
// defineOptions({
//   directives: {
//     'class-toggle': classToggle
//   }
// })
</script>

<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-blue-600">自定义指令 v-class-toggle 演示</h2>

    <div class="mb-8">
      <h3 class="text-xl font-semibold mb-4">使用 store 中的 searchFocus 参数控制类名</h3>

      <!-- 示例1: 对象形式 - 根据 searchFocus 控制多个类名 -->
      <div
        v-class-toggle="{
          'bg-blue-50': searchFocus,
          'border-2 border-blue-500': searchFocus,
          'shadow-lg': searchFocus,
        }"
        class="p-6 rounded-lg transition-all duration-300 mb-6"
      >
        <h4 class="text-lg font-medium mb-2">搜索框示例</h4>
        <div class="relative">
          <input
            type="text"
            placeholder="搜索内容..."
            class="w-full px-4 py-2 rounded-lg border transition-all duration-300"
            :value="indexStore.searchConfig.placeholder"
          />
        </div>
        <p class="mt-4 text-sm text-gray-600">当前 searchFocus 状态: {{ searchFocus }}</p>
      </div>

      <!-- 示例2: 参数形式 - 使用 searchFocus 控制单个类名 -->
      <div class="mb-6">
        <p v-class-toggle:text-blue-500="searchFocus" class="text-lg font-medium">
          这段文字会根据 store 中的 searchFocus 状态变为蓝色
        </p>
      </div>
    </div>

    <div class="flex gap-4">
      <button
        @click="toggleSearchFocus"
        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        {{ searchFocus ? '取消聚焦' : '设置聚焦' }}
      </button>

      <div class="mt-3 text-sm text-gray-600">点击按钮切换 store 中的 searchFocus 状态</div>
    </div>
  </div>
</template>
