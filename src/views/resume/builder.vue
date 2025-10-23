<script setup>
const router = useRouter()
const back = () => {
  router.push('/')
}
</script>

<template><div @click="back" class="w-full h-full">返回</div></template>

<style lang="scss" scoped></style>
