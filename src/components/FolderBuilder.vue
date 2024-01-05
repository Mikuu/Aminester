<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" sm="5">
          <v-text-field label="Storage root path" v-model="folderBuilderStore.config.storageRootPath"></v-text-field>
        </v-col>
        <v-col cols="12" sm="5">
          <v-text-field label="Decompress passcode file path" v-model="folderBuilderStore.config.decompressPasscodeFilePath"></v-text-field>
        </v-col>
        <v-col cols="12" sm="2">
          <v-text-field label="Start index" v-model="folderBuilderStore.startIndex"></v-text-field>
        </v-col>
      </v-row>

      <v-divider class="mb-4"/>

      <v-row class="mt-2">
        <v-col cols="12" sm="4">
          <v-text-field label="Object name" v-model="subjectName"></v-text-field>
        </v-col>
        <v-col cols="12" sm="5">
          <v-text-field label="Decompress passcode" v-model="decompressPasscode"></v-text-field>
        </v-col>
        <v-col cols="12" sm="1">
          <v-btn variant="outlined" class="mt-3 w-100" @click="add" :disabled="!subjectName || !folderBuilderStore.startIndex">Add</v-btn>
        </v-col>
        <v-col cols="12" sm="1">
          <v-btn variant="outlined" class="mt-3 w-100" @click="clear" :disabled="!folderBuilderStore.subjects.length">Clear</v-btn>
        </v-col>
        <v-col cols="12" sm="1">
          <v-btn variant="outlined" class="mt-3 w-100" @click="create"
                 :disabled="!folderBuilderStore.config.storageRootPath
                 || !folderBuilderStore.config.decompressPasscodeFilePath
                 || !folderBuilderStore.subjects.length">
            Create
          </v-btn>
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
              <tr v-for="subject in folderBuilderStore.subjects" :key="subject.name">
                <td>
                  <v-text-field variant="plain" v-model="subject.name"/>
                </td>
                <td>
                  <v-text-field variant="plain" v-model="subject.passcode"/>
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
import { useFolderBuilderStore } from "@/stores/folderBuilder";
import { useMainBoardStore } from "@/stores/mainBoard";

const subjectName = ref("");
const decompressPasscode = ref("");
const folderBuilderStore = useFolderBuilderStore();
const mainBoardStore = useMainBoardStore();

const add = () => {
  folderBuilderStore.addSubject(subjectName.value, decompressPasscode.value);
  subjectName.value = "";
  decompressPasscode.value = "";
};

const clear = () => {
  folderBuilderStore.clearSubjects();
  folderBuilderStore.resetIndex();
};

const create = () => {
  const createFolderResult = folderBuilderStore.createFolders();
  const createPasscodingFIleResult = folderBuilderStore.createPasscodingFile();

  if (createFolderResult && createPasscodingFIleResult) {
    mainBoardStore.enableSucceedSnackbar("Create folders and passcoding file succeed.");
  } else {
    mainBoardStore.enableFailedSnackbar("Create folders or passcoding file failed, check cause in Console.");
  }

};

</script>

<style scoped>

</style>
