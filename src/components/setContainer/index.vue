<script setup>
defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})
const modelValue = defineModel('modelValue')
const searchValue = defineModel('searchValue')
const handleClick = (item) => {
  modelValue.value = item.value
}
</script>

<template>
  <div class="flex h-[500px]">
    <div class="flex-col flex mr-4 w-[200px]">
      <div class="flex mb-4 rounded-xl overflow-hidden"><sf-input v-model="searchValue" /></div>
      <el-scrollbar class="flex-1">
        <!-- 限制最大高度，确保滚动条正常显示 -->
        <div class="bg-white rounded-xl p-2">
          <!-- 增加轻微阴影增强层次感 -->
          <!-- 使用flex布局让item自动换行，增加间距 -->
          <div
            v-for="(item, index) in list"
            :key="item.value"
            class="cursor-pointer px-3 py-2 rounded-lg transition-all duration-200"
            :class="[
              item.value === modelValue ? 'bg-primary text-white' : 'hover:bg-gray-100',
              {
                'border-b border-gray-200': index !== list.length - 1, // 最后一个item不添加下边框
              },
            ]"
            @click="handleClick(item)"
          >
            {{ item.name }}
          </div>
        </div>
      </el-scrollbar>
    </div>
    <el-scrollbar class="flex-1">
      <slot></slot>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped></style>
