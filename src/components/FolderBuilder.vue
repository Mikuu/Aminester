<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" sm="5">
          <v-text-field label="Storage root path" :model-value="storageRootPath"></v-text-field>
        </v-col>
        <v-col cols="12" sm="5">
          <v-text-field label="Decompress passcode file" :model-value="decompressPasscodeFile"></v-text-field>
        </v-col>
        <v-col cols="12" sm="2">
          <v-text-field label="Start index" :model-value="startIndex"></v-text-field>
        </v-col>
      </v-row>

      <v-divider class="mb-4"/>

      <v-row class="mt-2">
        <v-col cols="12" sm="4">
          <v-text-field label="Object name" :model-value="objectName"></v-text-field>
        </v-col>
        <v-col cols="12" sm="5">
          <v-text-field label="Decompress passcode" :model-value="decompressPasscode"></v-text-field>
        </v-col>
        <v-col cols="12" sm="1">
          <v-btn variant="outlined" class="mt-3">Add</v-btn>
        </v-col>
        <v-col cols="12" sm="1">
          <v-btn variant="outlined" class="mt-3">Clear</v-btn>
        </v-col>
        <v-col cols="12" sm="1">
          <v-btn variant="outlined" class="mt-3">Create</v-btn>
        </v-col>
      </v-row>

      <v-row class="mt-0">
        <v-col class="pt-0" cols="12" sm="12">
          <v-table fixed-header>
            <thead>
              <tr>
                <th class="text-left">Directory name</th>
                <th class="text-left">Decompress passcode</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in objectItems" :key="item.name">
                <td>
                  <v-text-field variant="plain" :model-value="item.name"/>
                </td>
                <td>
                  <v-text-field variant="plain" :model-value="item.decompressPasscode"/>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>

    </v-container>
  </v-form>
</template>

<script setup>
import { ref } from "vue";

const storageRootPath = ref("");
const decompressPasscodeFile = ref("");
const startIndex = ref("");
const objectName = ref("");
const decompressPasscode = ref("");
const objectItems = ref([
  {
    name: "I203_Fate Zero / Tonight_",
    decompressPasscode: "uploadedBy@desfaff"
  },
  {
    name: "I203_Fate Zero / Tonight_",
    decompressPasscode: "uploadedBy@desfaff"
  }
]);
</script>

<style scoped>

</style>
