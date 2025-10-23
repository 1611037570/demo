<script setup></script>

<template>
  <div
    class="flex flex-col bg-white p-4 rounded-lg shadow-md w-[740px] h-[1000px] transition-all duration-300 hover:shadow-lg hover:border-blue-300"
  >
    <div class="flex-1">
      <!-- 信息模块 -->
      <div class="flex items-center mb-6">
        <div class="text-xl font-bold mr-3">小羊</div>
        <div class="flex flex-col text-sm">
          <div>男|25岁 电话：15878892637 邮箱1611037570@qq.com</div>
          <div>3年工作经验</div>
        </div>
      </div>
      <!-- 教育经验 -->
      <div class="flex flex-col mb-6">
        <div class="text-lg font-bold mb-2">教育经历</div>
        <div class="flex justify-between items-center pb-2 mb-2">
          <div>
            <span class="font-medium"> 柳州工学院 </span>
            全日制本科 计算机科学与技术
          </div>
          <div>2021-2023</div>
        </div>
      </div>
      <!-- 专业技能 -->
      <div>
        <div class="text-lg font-bold my-2">专业技能</div>
        <div>
          <div>HTML/CSS</div>
          <div>JavaScript</div>
          <div>Vue.js</div>
          <div>React</div>
        </div>
      </div>
      <div>
        <div class="text-lg font-bold my-2">工作经历</div>
        <div class="flex justify-between items-center">
          <span class="font-medium"> 公司A </span>
          前端开发工程师 2023.03-2024.06
        </div>
      </div>
      <div>
        <div class="text-lg font-bold my-2">项目经历</div>
        <div class="flex justify-between items-center">
          <span class="font-medium"> 公司A </span>
          前端开发工程师 2023.03-2024.06
        </div>
      </div>
    </div>
    <div class="mt-auto text-center text-xs">第 1 页，共 1 页</div>
  </div>
</template>

<style scoped></style>
