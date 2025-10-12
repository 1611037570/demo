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
    class="p-3 px-1 flex flex-col justify-center items-center cursor-pointer rounded-xl hover:bg-amber-100"
  >
    <div class="w-[80px] h-[80px] bg-amber-200 rounded-xl"></div>
    <div class="mt-1 text-center text-sm truncate w-full">{{ item.name }}</div>
  </div>
</template>
<style scoped></style>
