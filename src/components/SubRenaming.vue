<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field label="Video path" v-model="subRenamingStore.config.videoPath"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field label="Subtitle path" v-model="subRenamingStore.config.subtitlePath"></v-text-field>
        </v-col>
      </v-row>

      <v-divider class="mb-4"/>

      <v-row class="mt-2" justify="start">
        <v-col cols="12" sm="2">
          <v-btn variant="outlined" class="mt-3 w-100" @click="load"
                 :disabled="!subRenamingStore.config.videoPath
                 || !subRenamingStore.config.subtitlePath">Load</v-btn>
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn variant="outlined" class="mt-3 w-100" @click="preview"
                 :disabled="!subRenamingStore.filesInVideoPath
                 || !subRenamingStore.filesInSubtitlePath">Preview</v-btn>
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn variant="outlined" class="mt-3 w-100" @click="clear"
                 :disabled="!subRenamingStore.filesInVideoPath
                 && !subRenamingStore.filesInSubtitlePath
                 && !subRenamingStore.generatedNewSubtitleFilenames">Clear</v-btn>
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn variant="outlined" class="mt-3 w-100" @click="create"
                 :disabled="!subRenamingStore.generatedNewSubtitleFilenames">Create</v-btn>
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn variant="outlined" class="mt-3 w-100" @click="reset"
                 :disabled="!subRenamingStore.config.videoPath
                 && !subRenamingStore.config.subtitlePath
                 && !subRenamingStore.filesInVideoPath
                 && !subRenamingStore.filesInSubtitlePath
                 && !subRenamingStore.generatedNewSubtitleFilenames">Reset</v-btn>
        </v-col>
        <v-col cols="12" sm="2" class="d-flex">
          <div :class="['text-h6', 'w-100', 'mt-3', 'align-self-center', matcherColor]">{{ matcher }}</div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" class="pt-4 pb-0">
          <v-textarea label="Ori Video" variant="outlined" rows="14" row-height="6"
                      v-model="subRenamingStore.filesInVideoPath"></v-textarea>
        </v-col>
        <v-col cols="12" sm="6" class="pt-4 pb-0">
          <v-textarea label="Ori Subtitle" variant="outlined" rows="14" row-height="6"
                      v-model="subRenamingStore.filesInSubtitlePath"></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" class="mb-0 py-0">
          <v-textarea label="ToBe Subtitle" variant="outlined" rows="14" row-height="6"
                      v-model="subRenamingStore.generatedNewSubtitleFilenames"></v-textarea>
        </v-col>
      </v-row>

      <v-row justify="end" class="mt-0">
        <v-col cols="12" sm="4" class="pt-0">
          <v-btn variant="outlined" class="mt-3 w-100">Video filter...</v-btn>
        </v-col>
        <v-col cols="12" sm="4" class="pt-0">
          <v-btn variant="outlined" class="mt-3 w-100">Subtitle filter...</v-btn>
        </v-col>
      </v-row>

    </v-container>
  </v-form>
</template>

<script setup>
import { ref, watch } from "vue";
import { useSubRenamingStore } from "@/stores/subRenaming";
import { useMainBoardStore } from "@/stores/mainBoard";

const subRenamingStore = useSubRenamingStore();
const mainBoardStore = useMainBoardStore();

const matcher = ref("");
const matcherColor = ref("");

const load = () => {
  subRenamingStore.loadVideoAndSubtitleFiles();
  checkAndUpdateMatcher();
};

const checkAndUpdateMatcher = () => {
  const videoFilesCount = subRenamingStore.filesInVideoPath.split("\n").length;
  const subtitleFilesCount = subRenamingStore.filesInSubtitlePath.split("\n").length;

  matcher.value = `${videoFilesCount}v/${subtitleFilesCount}s`;
  matcherColor.value = videoFilesCount === subtitleFilesCount ? "text-green-darken-3" : "text-deep-orange-accent-3"
};

watch(() => subRenamingStore.filesInVideoPath, () => {
  checkAndUpdateMatcher();
});

watch(() => subRenamingStore.filesInSubtitlePath, () => {
  checkAndUpdateMatcher();
});

const preview = () => {
  subRenamingStore.generateNewSubtitleFilenames();
};

const clear = () => {
  subRenamingStore.clear();
  matcher.value = "";
};

const create = () => {
  const result = subRenamingStore.create();

  if (result) {
    mainBoardStore.enableSucceedSnackbar("Create subtitles succeed.");
  } else {
    mainBoardStore.enableFailedSnackbar("Create subtitles failed, check Console...");
  }
};

const reset = () => {
  subRenamingStore.reset();
  matcher.value = "";
};

</script>

<style scoped>

</style>
