<template>
  <v-tabs
      v-model="tab"
      color="deep-purple-accent-4"
      align-tabs="center"
  >
    <v-tab value="1">Folder builder</v-tab>
    <v-tab value="2">Sub renaming</v-tab>
    <v-tab value="3">Directory flatten</v-tab>
  </v-tabs>
  <v-window v-model="tab">
    <v-window-item value="1" class="mt-4">
      <FolderBuilder/>
    </v-window-item>
    <v-window-item value="2" class="mt-4">
      Sub renaming
    </v-window-item>
    <v-window-item value="3" class="mt-4">
      Directory flatten
    </v-window-item>
  </v-window>
</template>

<script setup>
import FolderBuilder from "@/components/FolderBuilder.vue";
import { ref } from "vue";

const tab = ref(null);
</script>

<style scoped>

</style>
