<script setup>
defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})
const style = ['#E63946', '#FB8500', '#FFB703']
const currentIndex = ref(-1)
</script>

<template>
  <div
    v-for="(item, index) in 10"
    :key="item"
    class="rounded-lg px-2 py-1.5 text-sm hover:bg-blue-100 hover:text-blue-700 flex cursor-pointer items-center whitespace-nowrap text-sf-text transition-all duration-200"
    :class="{ 'bg-blue-100 text-blue-700': currentIndex === index }"
  >
    <div class="flex flex-1 items-center overflow-hidden">
      <div
        class="w-6 h-6 mr-3 text-xs text-white font-bold shadow-xl inline-flex items-center justify-center rounded-[6px] transition-colors duration-200"
        :style="{
          background: index < style.length ? style[index] : ' var(--color-sf-theme-hover) ',
        }"
      >
        {{ index + 1 }}
      </div>
      <div class="mr-3 flex-1 overflow-hidden text-ellipsis">
        {{ item }}
      </div>
    </div>
    <div>123213</div>
  </div>
</template>

<style scoped></style>
