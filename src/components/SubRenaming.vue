<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field label="Video path" :model-value="videoPath"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field label="Subtitle path" :model-value="subtitlePath"></v-text-field>
        </v-col>
      </v-row>

      <v-divider class="mb-4"/>

      <v-row class="mt-2" justify="start">
        <v-col cols="12" sm="2">
          <v-btn variant="outlined" class="mt-3 w-100">Load</v-btn>
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn variant="outlined" class="mt-3 w-100">Preview</v-btn>
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn variant="outlined" class="mt-3 w-100">Clear</v-btn>
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn variant="outlined" class="mt-3 w-100">Create</v-btn>
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn variant="outlined" class="mt-3 w-100">Reset</v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="12" class="py-0">
          <v-textarea label="Video" variant="outlined" rows="14" row-height="6"></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" class="mb-0 py-0">
          <v-textarea label="Subtitle" variant="outlined" rows="14" row-height="6"></v-textarea>
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
import { ref } from "vue";

const videoPath = ref("");
const subtitlePath = ref("");
// const startIndex = ref("");
// const objectName = ref("");
// const decompressPasscode = ref("");
// const objectItems = ref([
//   {
//     name: "I203_Fate Zero / Tonight_",
//     decompressPasscode: "uploadedBy@desfaff"
//   },
//   {
//     name: "I203_Fate Zero / Tonight_",
//     decompressPasscode: "uploadedBy@desfaff"
//   }
// ]);
</script>

<style scoped>

</style>
