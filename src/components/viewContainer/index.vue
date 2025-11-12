<template>
  <div class="flex h-full w-full flex-col">
    <div class="p-3 flex-c relative">
      <div class="left-3 flex-c absolute top-1/2 -translate-y-1/2 cursor-pointer" @click="back">
        <SfIcon icon="famicons:chevron-back" size="5" />
        返回主站
      </div>
      <div class="text-2xl font-bold">{{ title }}</div>
      <div class="right-3 flex-c absolute top-1/2 -translate-y-1/2">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="w-full flex-1">
      <slot />
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
defineProps({
  title: {
    type: String,
    default: '',
  },
})

function back() {
  router.push('/')
}
</script>

<style scoped></style>
