<script setup>
import I18n from './i18n.vue'
import Setting from './setting.vue'
import Theme from './theme.vue'
import Tip from './tip.vue'
</script>

<template>
  <div
    class="top-0 left-0 right-0 gap-3 border-blue-100/40 py-1 px-2 fixed z-20 flex items-center justify-between bg-sf-transparent-2"
  >
    <Tip />
    <div class="gap-3 flex items-center">
      <I18n />
      <Theme />
      <Setting />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
