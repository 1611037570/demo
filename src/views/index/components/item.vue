<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    default: () => ({
      name: '',
      url: '',
    }),
  },
})
</script>

<template>
  <div
    class="p-3 px-1 flex flex-col justify-center items-center cursor-pointer rounded-sm hover:bg-amber-100"
  >
    <div class="w-[80px] h-[80px] bg-amber-200"></div>
    <div class="mt-1 h-[20px] text-center truncate">{{ item.name }}</div>
  </div>
</template>
<style scoped></style>
