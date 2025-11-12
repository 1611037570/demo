<template>
  <div v-for="category in techStackList" :key="category.key">
    <h3 class="mb-4 pb-2 text-lg font-semibold text-blue-600">
      {{ category.name }}
    </h3>
    <div class="gap-4 grid grid-cols-2">
      <div
        v-for="tech in category.items"
        :key="tech.name"
        class="rounded-lg bg-white p-4 shadow-sm hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-md flex flex-col items-center justify-center text-center transition-all duration-200"
      >
        <div class="mb-2 text-3xl text-blue-700">
          <SfIcon :icon="tech.icon" />
        </div>
        <div class="font-medium text-blue-800">{{ tech.name }}</div>
        <!-- 版本信息 -->
        <div v-if="tech.version" class="mt-1 text-sm text-gray-500">{{ tech.version }}</div>
        <!-- 描述信息 -->
        <div v-if="tech.description" class="mt-1 text-xs text-gray-500 max-w-full truncate">
          {{ tech.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { techStackList } from './data'
</script>

<style scoped></style>
