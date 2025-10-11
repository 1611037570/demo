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
  <a
    :href="item.url"
    target="_blank"
    class="p-3 pb-2 flex flex-col justify-center items-center cursor-pointer rounded-sm hover:bg-amber-100"
  >
    <dvi class="w-[50px] h-[50px] bg-amber-200"></dvi>
    <dvi class="mt-1 h-[20px] text-center truncate">{{ item.name }}</dvi>
  </a>
</template>
<style scoped></style>
