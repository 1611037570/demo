<template>
  <div class="p-6 space-y-8">
    <h2 class="text-2xl font-bold text-center mb-8">Tailwind CSS 4 自定义主题色示例</h2>
    
    <!-- 自定义主色演示 -->
    <div class="space-y-4">
      <h3 class="text-xl font-semibold">主色调 (Primary)</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- 主色 -->
        <div class="bg-primary text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div class="text-lg font-medium mb-2">主色 - bg-primary</div>
          <div class="text-sm opacity-80">#165DFF</div>
        </div>
        
        <!-- 主色亮版本 -->
        <div class="bg-primary-light text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div class="text-lg font-medium mb-2">主色亮版本 - bg-primary-light</div>
          <div class="text-sm opacity-80">#4080FF</div>
        </div>
        
        <!-- 主色暗版本 -->
        <div class="bg-primary-dark text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div class="text-lg font-medium mb-2">主色暗版本 - bg-primary-dark</div>
          <div class="text-sm opacity-80">#0E42D2</div>
        </div>
      </div>
    </div>
    
    <!-- 文本颜色演示 -->
    <div class="space-y-4">
      <h3 class="text-xl font-semibold">文本颜色</h3>
      <div class="space-y-3">
        <p class="text-primary text-xl hover:text-primary-dark transition-colors duration-300">
          主色文本 - text-primary (悬停时变为深色)
        </p>
        <p class="text-primary-light text-xl hover:text-primary transition-colors duration-300">
          主色亮色文本 - text-primary-light (悬停时变为标准色)
        </p>
        <p class="text-primary-dark text-xl hover:text-primary-light transition-colors duration-300">
          主色暗色文本 - text-primary-dark (悬停时变为亮色)
        </p>
      </div>
    </div>
    
    <!-- 边框颜色演示 -->
    <div class="space-y-4">
      <h3 class="text-xl font-semibold">边框颜色</h3>
      <div class="flex flex-wrap gap-4">
        <div class="border-2 border-primary p-4 rounded-lg hover:bg-primary/5 transition-colors duration-300">
          主色边框 - border-primary
        </div>
        <div class="border-2 border-primary-light p-4 rounded-lg hover:bg-primary-light/5 transition-colors duration-300">
          主色亮色边框 - border-primary-light
        </div>
        <div class="border-2 border-primary-dark p-4 rounded-lg hover:bg-primary-dark/5 transition-colors duration-300">
          主色暗色边框 - border-primary-dark
        </div>
      </div>
    </div>
    
    <!-- 按钮样式演示 -->
    <div class="space-y-4">
      <h3 class="text-xl font-semibold">按钮样式</h3>
      <div class="flex flex-wrap gap-4">
        <!-- 主按钮 -->
        <button class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-300 focus:ring-2 focus:ring-primary/50 focus:outline-none">
          主按钮
        </button>
        
        <!-- 次要按钮 -->
        <button class="bg-white text-primary border border-primary px-6 py-3 rounded-lg hover:bg-primary/5 transition-colors duration-300 focus:ring-2 focus:ring-primary/50 focus:outline-none">
          次要按钮
        </button>
        
        <!-- 亮色按钮 -->
        <button class="bg-primary-light text-white px-6 py-3 rounded-lg hover:bg-primary transition-colors duration-300 focus:ring-2 focus:ring-primary-light/50 focus:outline-none">
          亮色按钮
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这是一个演示组件，展示如何使用Tailwind CSS 4中通过@theme定义的自定义颜色
</script>

<style scoped>
/* Tailwind CSS 4 会自动处理这些自定义颜色类 */
</style>