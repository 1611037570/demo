<template>
  <Transition name="dropdown" appear>
    <div
      ref="sourceDropdown"
      v-if="webSourceListVisible"
      class="source-dropdown mt-3 p-2 left-0 rounded-xl border-blue-100 bg-white shadow-lg absolute top-full z-90 w-[220px] overflow-hidden border"
    >
      <div
        v-for="source in webSource"
        :key="source.type"
        class="group rounded-md px-3 py-2.5 text-sm hover:bg-blue-50 hover:pl-4 flex cursor-pointer items-center transition-all duration-200"
        @click.stop="changeSource(source)"
      >
        <el-image
          v-if="source.icon"
          :src="source.icon"
          class="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110"
        ></el-image>
        <span class="group-hover:text-blue-600 transition-colors duration-200">{{
          source.type
        }}</span>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { webSource } from '@/datas/search.data'
import { useSearchStore } from '@/stores'
import { onClickOutside } from '@vueuse/core'

const searchStore = useSearchStore()
const { webSourceListVisible, currentWebIndex } = storeToRefs(searchStore)

// 切换搜索源
const changeSource = (source) => {
  currentWebIndex.value = webSource.value.indexOf(source)
  webSourceListVisible.value = false
}
const sourceDropdown = useTemplateRef('sourceDropdown')
// 点击外部关闭搜索源列表
onClickOutside(sourceDropdown, () => {
  setTimeout(() => {
    webSourceListVisible.value = false
  }, 10)
})
</script>

<style lang="scss" scoped></style>
