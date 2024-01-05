<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" sm="8">
          <v-text-field label="Flatten directory path" v-model="directoryFlattenStore.config.flattenPath"></v-text-field>
        </v-col>
        <v-col cols="12" sm="2">
          <v-select label="Depth" :items="[0,1]" variant="outlined" v-model="directoryFlattenStore.config.depth"></v-select>
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn variant="outlined" class="mt-3 w-100" @click="flatten"
                 :disabled="!directoryFlattenStore.config.flattenPath">Flatten</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup>
import { useDirectoryFlattenStore } from "@/stores/flatten";
import { useMainBoardStore } from "@/stores/mainBoard";

const directoryFlattenStore = useDirectoryFlattenStore();
const mainBoardStore = useMainBoardStore();

const flatten = () => {
  const result = directoryFlattenStore.flatten();

  if (result) {
    mainBoardStore.enableSucceedSnackbar("Flatten folder succeed.");
  } else {
    mainBoardStore.enableFailedSnackbar("Flatten folder failed, check Console...");
  }
};
</script>

<style scoped>

</style>
