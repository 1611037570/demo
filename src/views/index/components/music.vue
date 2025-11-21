<script setup>
import { ref } from 'vue'
const protagonist = import('@/assets/audios/protagonist.mp3')

// 音乐播放状态管理
const isPlaying = ref(false)
const audioPlayer = ref(null)
const audioUrl = ref('')
// 加载音频文件
protagonist.then((module) => {
  console.log('音频资源加载成功:', module.default)
  audioUrl.value = module.default
})

const togglePlay = () => {
  if (isPlaying.value) {
    try {
      audioPlayer.value.pause()
      // 关闭静音
      isPlaying.value = false
    } catch (err) {
      console.warn('音频暂停失败:', err)
    }
  } else {
    // play()返回Promise，需要正确处理
    audioPlayer.value
      .play()
      .then(() => {
        isPlaying.value = true
        console.log('音频开始播放')
      })
      .catch((err) => {
        console.warn('音频播放失败:', err)
        // 播放失败时不改变状态
      })
  }
}
</script>
<!-- https://kaifa.baidu.com/ -->
<template>
  <div class="fixed top-12 right-12 z-99" v-if="audioUrl">
    <audio
      ref="audioPlayer"
      :src="audioUrl"
      preload="auto"
      loop
      autoplay
      @loadeddata="onAudioLoaded"
    ></audio>
    <div class="group relative">
      <!-- 左侧信息div，默认隐藏，鼠标悬停时展开 -->
      <div
        class="absolute right-full mr-3 translate-x-4 transform rounded-lg bg-white/90 px-4 py-2 text-sm text-sf-text opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
      >
        音乐播放器
      </div>
      <!-- 播放按钮 -->
      <div
        @click="togglePlay"
        class="flex cursor-pointer items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white"
      >
        <SfIcon
          :icon="isPlaying ? 'lucide:pause' : 'lucide:play'"
          class="h-5 w-5 text-sf-primary transition-colors duration-300 hover:text-sf-theme"
          :class="isPlaying ? 'animate-spin' : ''"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
