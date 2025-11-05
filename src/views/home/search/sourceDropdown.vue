<template>
  <transition name="dropdown" appear>
    <div
      v-if="sourceMenuOpen"
      class="source-dropdown mt-3 left-0 rounded-xl border-blue-100 bg-white shadow-lg absolute top-full z-90 w-[220px] overflow-hidden border"
    >
      <div class="p-2">
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
    </div>
  </transition>
</template>

<script setup></script>

<style lang="scss" scoped></style>
