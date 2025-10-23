<template>
  <Teleport to="body">
    <div
      v-if="modeValue"
      class="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center"
      style="
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        background-color: rgba(0, 0, 0, 0.4);
      "
    >
      <div class="flex flex-col bg-neutral-200 rounded-xl p-4">
        <!-- 标题和关闭按钮 -->
        <div class="flex justify-between items-center">
          <div class="text-2xl font-bold">123</div>
          <div class="text-2xl font-bold cursor-pointer" @click="modeValue = false">关闭</div>
        </div>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const modeValue = defineModel()
</script>

<style scoped></style>
