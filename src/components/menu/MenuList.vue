<template>
  <div class="w-[220px] bg-white rounded-xl border border-blue-100 overflow-hidden p-2">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="menu-item flex items-center px-3 py-2.5 rounded-md hover:bg-blue-50 cursor-pointer text-sm transition-all duration-200 hover:pl-4 group"
      @click="select($event, item)"
      @mousedown="select($event, item)"
    >
      <!-- 菜单项文本 -->
      <div
        class="text-gray-700 group-hover:text-blue-600 transition-colors duration-200 font-medium"
      >
        {{ item[nameKey] }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  list: {
    type: Array<any>,
    default: () => [],
  },
  nameKey: {
    type: String,
    default: 'name',
  },
})
const emit = defineEmits(['select'])
const select = (event: any, item: any) => {
  event.stopPropagation()
  event.preventDefault()
  emit('select', item)
}
</script>

<style scoped></style>
