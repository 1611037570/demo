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
      <div class="mb-4 flex overflow-hidden rounded-xl">
        <SfInput v-model="searchValue">
          <template #prefix>
            <SfIcon icon="fluent:search-24-regular" class="h-4 w-4" size="4" />
          </template>
        </SfInput>
      </div>
      <ElScrollbar class="flex-1">
        <div class="rounded-xl bg-white p-2">
          <div
            v-for="(item, index) in list"
            :key="item.value"
            class="cursor-pointer rounded-lg px-3 py-2 transition-all duration-200"
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
      </ElScrollbar>
    </div>
    <ElScrollbar class="flex-1">
      <slot></slot>
    </ElScrollbar>
  </div>
</template>

<style lang="scss" scoped></style>
