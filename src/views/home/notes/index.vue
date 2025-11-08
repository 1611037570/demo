<script setup>
import { useNoteStore } from '@/stores'
import NoteList from './components/noteList.vue'
const noteStore = useNoteStore()

const { noteList, currentIndex } = storeToRefs(noteStore)

const noteVisible = ref(true)

function switchStatus(key) {
  noteList.value[currentIndex.value][key] = !noteList.value[currentIndex.value][key]
}
</script>

<template>
  <SfModal v-model="noteVisible" v-if="noteVisible" title="便签">
    <div class="flex h-[500px] w-[600px]">
      <NoteList />
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
        <div class="w-full">
          <!-- v-model="textarea" -->

          <SfInput
            class="bg-pink-400 rounded-xl p-1 flex-1"
            v-model="textarea"
            maxlength="200"
            style="width: 240px"
            placeholder="Please input"
            show-word-limit
            type="textarea"
          />
        </div>
      </div>
    </div>
  </SfModal>
</template>
<style lang="scss" scoped></style>
