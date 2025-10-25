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
  <div class="flex">
    <div class="flex-col flex mr-4 w-[200px]">
      <div class="flex mb-4 rounded-xl overflow-hidden">
        <sf-input v-model="searchValue">
          <template #prefix>
            <sf-icon icon="fluent:search-24-regular" class="w-4 h-4" />
          </template>
        </sf-input>
      </div>
      <el-scrollbar class="flex-1">
        <div class="bg-white rounded-xl p-2">
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
