<template>
  <v-snackbar color="deep-purple-accent-4" elevation="24" v-model="mainBoardStore.failedSnackbar.display">
    {{ mainBoardStore.failedSnackbar.message }}
    <template v-slot:actions>
      <v-btn color="deep-purple-lighten-4" variant="text" @click="closeFailedSnackbar">
        Close
      </v-btn>
    </template>
  </v-snackbar>
  <v-snackbar color="green-darken-4" elevation="24" v-model="mainBoardStore.succeedSnackbar.display">
    {{ mainBoardStore.succeedSnackbar.message }}
    <template v-slot:actions>
      <v-btn color="green-lighten-5" variant="text" @click="closeSucceedSnackbar">
        Close
      </v-btn>
    </template>
  </v-snackbar>
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
      <FolderBuilder />
    </v-window-item>
    <v-window-item value="2" class="mt-4">
      <SubRenaming />
    </v-window-item>
    <v-window-item value="3" class="mt-4">
      <DirectoryFlatten />
    </v-window-item>
  </v-window>
</template>

<script setup>
import FolderBuilder from "@/components/FolderBuilder.vue";
import SubRenaming from "@/components/SubRenaming.vue";
import DirectoryFlatten from "@/components/DirectoryFlatten.vue";
import { useMainBoardStore } from "@/stores/mainBoard";
import { ref } from "vue";

const mainBoardStore = useMainBoardStore();
const tab = ref(null);

const closeFailedSnackbar = () => {
  mainBoardStore.disableFailedSnackbar();
};

const closeSucceedSnackbar = () => {
  mainBoardStore.disableSucceedSnackbar();
};
</script>

<style scoped>

</style>
