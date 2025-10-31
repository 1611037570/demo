<script setup lang="ts"></script>

<template>
  <div
    class="px-2.5 py-1.5 hover:shadow-xl flex cursor-pointer items-center justify-center rounded-full bg-sf-modal text-[12px] whitespace-nowrap transition-all duration-200 hover:bg-sf-primary-hover"
  >
    <div class="max-w-[100px]">
      <slot></slot>
    </div>
    <slot name="right"></slot>
  </div>
</template>
<style lang="scss" scoped></style>
