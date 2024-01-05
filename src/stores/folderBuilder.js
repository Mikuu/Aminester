import { defineStore } from 'pinia'
import { nextIndex } from "../../utils/commonUtils";
import { createFolders, createPasscodingFile } from "../../utils/folderBuilderUtils";

export const useFolderBuilderStore = defineStore('folderBuilder', {
    state: () => ({
        config: {
            storageRootPath: "",
            decompressPasscodeFilePath: "",
        },
        startIndex: "",
        currentIndex: "",
        subjects: []
    }),

    getters: {},

    actions: {
        addSubject(subjectName, decompressPasscode) {
            this.currentIndex = this.currentIndex ? nextIndex(this.currentIndex) : this.startIndex;

            this.subjects.push({
                name: this.currentIndex + "_" + subjectName + "_",
                passcode: decompressPasscode
            });
        },

        clearSubjects() {
            this.subjects = [];
        },

        resetIndex() {
            this.startIndex = "";
            this.currentIndex = "";
        },

        createFolders() {
            return createFolders(this.config.storageRootPath, this.subjects.map(subject => subject.name));
        },

        createPasscodingFile() {
            return createPasscodingFile(this.config.decompressPasscodeFilePath, this.subjects);
        }
    },
})
