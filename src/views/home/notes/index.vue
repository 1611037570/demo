<script setup>
import { useNoteStore } from '@/stores'
const noteStore = useNoteStore()
const { noteList } = storeToRefs(noteStore)

const noteVisible = ref(true)
const flag = ref(false)

const currentIndex = ref(null)
const setCurrentIndex = (index) => {
  currentIndex.value = index
}

function switchStatus(key) {
  noteList.value[currentIndex.value][key] = !noteList.value[currentIndex.value][key]
}
</script>

<template>
  <SfModal v-model="noteVisible" v-if="noteVisible">
    <div class="flex h-[500px] w-[600px]">
      <div class="mr-3 flex w-[200px] flex-col">
        1
        <div @click="noteStore.addNote()">add</div>
        <div
          v-for="(item, index) in noteList"
          :key="index"
          @click="setCurrentIndex(index)"
          class="p-2 flex hover:bg-sf-theme-hover hover:text-sf-theme"
          :class="{ 'bg-sf-theme text-sf-theme': currentIndex === index }"
        >
          <SfIcon
            icon="pajamas:todo-done"
            size="5"
            boxSize="8"
            class="rounded-lg mr-2 bg-sf-primary-hover hover:bg-sf-theme-hover hover:text-sf-theme"
          />
          <div>{{ item.value }}</div>
        </div>
      </div>
      <div class="flex flex-1 flex-col">
        <div class="gap-3 mb-3 flex" v-if="currentIndex != null">
          <SfTooltip info="固定在起始页">
            <SfIcon
              icon="ic:round-push-pin"
              size="5"
              @click="switchStatus('top')"
              :class="{ 'bg-sf-theme-hover text-sf-theme': noteList[currentIndex].top }"
              boxSize="8"
              class="rounded-lg bg-sf-primary-hover hover:bg-sf-theme-hover hover:text-sf-theme"
            />
          </SfTooltip>
          <SfTooltip
            :info="noteList[currentIndex].todo ? '取消待办' : '设为待办'"
            v-if="currentIndex != null"
          >
            <SfIcon
              @click="switchStatus('todo')"
              icon="pajamas:todo-add"
              :class="{ 'bg-sf-theme-hover text-sf-theme': noteList[currentIndex].todo }"
              size="5"
              boxSize="8"
              class="rounded-lg bg-sf-primary-hover hover:bg-sf-theme-hover hover:text-sf-theme"
            />
          </SfTooltip>

          <SfTooltip info="设为Markdown" v-if="currentIndex != null">
            <SfIcon
              @click="switchStatus('md')"
              icon="ph:file-md-duotone"
              :class="{ 'bg-sf-theme-hover text-sf-theme': noteList[currentIndex].md }"
              size="5"
              boxSize="8"
              class="rounded-lg bg-sf-primary-hover hover:bg-sf-theme-hover hover:text-sf-theme"
            />
          </SfTooltip>
          <SfTooltip info="设置背景颜色" v-if="currentIndex != null">
            <SfIcon
              icon="fluent-mdl2:color-solid"
              size="5"
              boxSize="8"
              class="rounded-lg bg-sf-primary-hover hover:bg-sf-theme-hover hover:text-sf-theme"
            />
          </SfTooltip>
          <SfTooltip info="删除" v-if="currentIndex != null">
            <SfIcon
              icon="material-symbols:delete-outline"
              size="5"
              boxSize="8"
              class="rounded-lg bg-sf-primary-hover hover:bg-sf-theme-hover hover:text-sf-theme"
            />
          </SfTooltip>
        </div>
        <div class="bg-pink-400 w-full flex-1"></div>
      </div>
    </div>
  </SfModal>
</template>
<style lang="scss" scoped></style>
