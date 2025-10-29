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
    <div class="mr-4 flex w-[200px] flex-col">
      <div class="mb-4 rounded-xl flex overflow-hidden">
        <SfInput v-model="searchValue" placeholder="搜索" class="bg-sf-primary text-sf-text">
          <template #prefix>
            <SfIcon icon="fluent:search-24-regular" class="h-4 w-4" size="4" />
          </template>
        </SfInput>
      </div>
      <ElScrollbar class="flex-1">
        <div class="rounded-xl p-2 bg-sf-primary">
          <div
            v-for="(item, index) in list"
            :key="item.value"
            class="rounded-lg px-3 py-2 cursor-pointer transition-all duration-200"
            :class="[
              item.value === modelValue ? 'sf-theme' : 'hover:bg-sf-primary-hover',
              {
                'border-gray-200 border-b': index !== list.length - 1, // 最后一个item不添加下边框
              },
            ]"
            @click="handleClick(item)"
          >
            {{ item.name }}
          </div>
        </div>
      </ElScrollbar>
    </div>
    <ElScrollbar class="flex-1">
      <slot></slot>
    </ElScrollbar>
  </div>
</template>

<style lang="scss" scoped></style>
