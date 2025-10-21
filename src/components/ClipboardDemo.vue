<script setup>
import { useClipboard } from '@/hooks/useClipboard'
import { ref } from 'vue'

// 使用复制到剪贴板的hook
const { copyToClipboard, isCopied, error } = useClipboard()

// 输入的文本内容
const textToCopy = ref('这是一段可以被复制到剪贴板的文本')

// 处理复制按钮点击
const handleCopy = async () => {
  if (textToCopy.value.trim()) {
    await copyToClipboard(textToCopy.value)
  }
}
</script>

<template>
  <div class="bg-white p-6 rounded-xl shadow-md border border-blue-100 max-w-md mx-auto">
    <h3 class="text-lg font-medium text-gray-800 mb-4">剪贴板功能演示</h3>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">输入文本</label>
      <textarea
        v-model="textToCopy"
        class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        rows="3"
      ></textarea>
    </div>

    <button
      @click="handleCopy"
      class="w-full py-2.5 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md"
      :disabled="!textToCopy.trim()"
    >
      复制到剪贴板
    </button>
  </div>
</template>
