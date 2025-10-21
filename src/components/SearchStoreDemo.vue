<template>
  <div class="bg-white p-6 rounded-xl shadow-md border border-blue-100">
    <h3 class="text-xl font-semibold mb-4 text-blue-700">Search Store 功能测试</h3>

    <div class="space-y-4">
      <!-- 显示搜索相关状态 -->
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-blue-50 p-3 rounded-lg">
          <p class="text-sm text-gray-600">搜索聚焦状态</p>
          <p class="font-medium">{{ searchFocus }}</p>
        </div>
        <div class="bg-blue-50 p-3 rounded-lg">
          <p class="text-sm text-gray-600">禁用搜索历史</p>
          <p class="font-medium">{{ showSearchHistory }}</p>
        </div>
        <div class="bg-blue-50 p-3 rounded-lg">
          <p class="text-sm text-gray-600">打开方式</p>
          <p class="font-medium">{{ openMode === '_blank' ? '新标签页' : '当前标签页' }}</p>
        </div>
        <div class="bg-blue-50 p-3 rounded-lg">
          <p class="text-sm text-gray-600">搜索历史数量</p>
          <p class="font-medium">{{ searchHistory.length }}</p>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="flex flex-wrap gap-3 mt-4">
        <button
          @click="toggleSearchFocus"
          class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          {{ searchFocus ? '取消搜索聚焦' : '设置搜索聚焦' }}
        </button>

        <button
          @click="toggleshowSearchHistory"
          class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          {{ showSearchHistory ? '启用搜索历史' : '禁用搜索历史' }}
        </button>

        <button
          @click="toggleOpenMode"
          class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          切换打开方式
        </button>

        <button
          @click="addTestHistory"
          class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
        >
          添加测试历史
        </button>

        <button
          @click="clearAllHistory"
          class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
        >
          清空搜索历史
        </button>
      </div>

      <!-- 搜索历史列表 -->
      <div v-if="searchHistory.length > 0" class="mt-6">
        <h4 class="font-medium mb-2">搜索历史列表：</h4>
        <ul class="space-y-2">
          <li
            v-for="(item, index) in searchHistory"
            :key="index"
            class="flex items-center justify-between bg-gray-50 p-3 rounded"
          >
            <span>{{ item.label }}</span>
            <button @click="removeHistory(index)" class="text-red-500 hover:text-red-700">
              删除
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'

// 导入search store
const searchStore = useSearchStore()
const { searchFocus, searchHistory, showSearchHistory, openMode } = storeToRefs(searchStore)

// 操作方法
function toggleSearchFocus() {
  searchStore.setSearchFocus(!searchFocus.value)
}

function toggleshowSearchHistory() {
  searchStore.setShowSearchHistory(!showSearchHistory.value)
}

function toggleOpenMode() {
  searchStore.setOpenMode(openMode.value === '_blank' ? '_self' : '_blank')
}

function addTestHistory() {
  const testItems = [
    { label: 'Google', value: 'https://www.google.com/useSearchStore?q=' },
    { label: 'Bing', value: 'https://www.bing.com/useSearchStore?q=' },
    { label: '百度', value: 'https://www.baidu.com/s?wd=' },
  ]
  const randomItem = testItems[Math.floor(Math.random() * testItems.length)]
  searchStore.addSearchHistory(randomItem)
}

function removeHistory(index) {
  searchStore.removeSearchHistory(index)
}

function clearAllHistory() {
  searchStore.clearSearchHistory()
}
</script>
