<template>
  <div class="flex flex-col items-center p-6 max-w-md mx-auto">
    <!-- 标题 -->
    <h3 class="text-xl font-semibold text-blue-600 mb-4 text-center">支持项目发展</h3>

    <!-- 描述 -->
    <div class="text-gray-700 mb-6 text-center leading-relaxed">
      如果您也喜欢我的项目，简单的捐赠就是对我最大的物质和精神支持。
    </div>

    <!-- 支付方式容器 -->
    <div class="grid grid-cols-2 gap-8 my-6 w-full">
      <div
        v-for="item in list"
        :key="item.name"
        class="flex flex-col items-center transition-all duration-300"
      >
        <div
          class="w-48 h-64 bg-white rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300"
        >
          <ElImage
            :src="item.value"
            :alt="item.name"
            fit="contain"
            class="w-full h-full p-4 cursor-pointer hover:scale-[1.02] transition-transform duration-200"
          />
        </div>
        <span
          class="mt-3 text-gray-600 font-medium group-hover:text-blue-600 transition-colors duration-200"
          >{{ item.name }}</span
        >
      </div>
    </div>

    <!-- 感谢语 -->
    <div class="text-blue-500 text-center mt-4 italic">感谢您的支持！</div>
  </div>
</template>

<script setup>
// 导入支付图片
import aliPay from '@/assets/images/aliPay.jpg'
import weChatPay from '@/assets/images/weChatPay.jpg'
import { ElImage } from 'element-plus'

// 支付方式列表
const list = [
  { name: '支付宝', value: aliPay },
  { name: '微信支付', value: weChatPay },
]
</script>
