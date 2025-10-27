<template>
  <div v-for="(category, categoryName) in techStacks" :key="categoryName">
    <h3 class="text-lg font-semibold mb-4 text-blue-600 pb-2">
      {{ categoryName }}
    </h3>
    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="tech in category"
        :key="tech.name"
        class="bg-white rounded-lg p-4 shadow-sm hover:shadow-md hover:bg-blue-50 flex flex-col items-center justify-center text-center hover:-translate-y-0.5 transition-all duration-200"
      >
        <div class="text-3xl mb-2 text-blue-700">
          <SfIcon :icon="tech.icon" />
        </div>
        <div class="font-medium text-blue-800">{{ tech.name }}</div>
        <!-- 版本信息 -->
        <div v-if="tech.version" class="text-sm text-gray-500 mt-1">{{ tech.version }}</div>
        <!-- 描述信息 -->
        <div v-if="tech.description" class="text-xs text-gray-500 mt-1 truncate max-w-full">
          {{ tech.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { techStacks } from './data'
</script>

<style scoped></style>
