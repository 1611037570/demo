<template>
  <div class="flex h-full w-full flex-col">
    <div class="p-3 flex-c relative bg-sf-primary text-sf-basic">
      <div class="left-3 flex-c absolute top-1/2 -translate-y-1/2 cursor-pointer" @click="back">
        <SfIcon icon="famicons:chevron-back" size="5" />
        返回主站
      </div>
      <div class="text-2xl font-bold">{{ title }}</div>
      <div class="right-3 flex-c absolute top-1/2 -translate-y-1/2">
        <slot name="right"></slot>
        <el-dropdown>
          <ElButton> 更多工具 </ElButton>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(item, index) in list"
                :key="item.url"
                :divided="index > 0 && index !== list.length"
                @click="handleClick(item)"
                >{{ item.name }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="w-full flex-1">
      <slot />
    </div>
    <div class="flex-c gap-2 my-1">
      <div
        class="py-1 px-3 text-xs backdrop-blur-sm shadow-sm flex-c flex-col rounded-full border bg-sf-transparent-2 text-sf-theme"
      >
        <div>© 2020-2025</div>
        <div class="flex-c">
          版权所有：
          <span
            @click="goMy"
            class="font-medium cursor-pointer transition-colors duration-300 hover:text-sf-theme-hover"
          >
            XiaoYang</span
          >
        </div>
        <div class="flex-c">
          技术支持：
          <span
            @click="back"
            class="font-medium cursor-pointer transition-colors duration-300 hover:text-sf-theme-hover"
            >雪花起始页</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const route = useRoute()
defineProps({
  title: {
    type: String,
    default: '',
  },
})

const list = computed(() => {
  const items = [
    {
      name: '图片处理',
      url: '/image',
    },
    {
      name: '简历制作',
      url: '/resume',
    },
    {
      name: '便签墙',
      url: '/noteWall',
    },
  ]
  // 过滤当前路由匹配的菜单项
  return items.filter((item) => route.path !== item.url)
})
function back() {
  router.push('/')
}
function handleClick(item) {
  router.push(item.url)
}
function goMy() {
  router.push('/my')
}
</script>

<style scoped></style>
