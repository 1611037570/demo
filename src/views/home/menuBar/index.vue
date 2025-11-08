<script setup>
import I18n from './i18n.vue'
import Setting from './setting.vue'
import Theme from './theme.vue'
import Tip from './tip.vue'
</script>

<template>
  <div class="top-12 right-12 gap-3 fixed z-20 flex items-center">
    <Tip />
    <div class="gap-3 flex items-center">
      <I18n />
      <Theme />
      <Setting />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
