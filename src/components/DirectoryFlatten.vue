<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" sm="10">
          <v-text-field label="Flatten directory path" :model-value="flattenDirectoryPath"></v-text-field>
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn variant="outlined" class="mt-3 w-100">Flatten</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup>
import { ref } from "vue";

const flattenDirectoryPath = ref("");
</script>

<style scoped>

</style>
