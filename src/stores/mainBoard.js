import { defineStore } from 'pinia'

export const useMainBoardStore = defineStore('mainBoard', {
    state: () => ({
        succeedSnackbar: {
            display: false,
            message: ""
        },

        failedSnackbar: {
            display: false,
            message: ""
        }
    }),

    getters: {},

    actions: {
        enableSucceedSnackbar(message) {
            this.succeedSnackbar.message = message;
            this.succeedSnackbar.display = true;
        },

        disableSucceedSnackbar() {
            this.succeedSnackbar.message = "";
            this.succeedSnackbar.display = false;
        },

        enableFailedSnackbar(message) {
            this.failedSnackbar.message = message;
            this.failedSnackbar.display = true;
        },

        disableFailedSnackbar() {
            this.failedSnackbar.message = "";
            this.failedSnackbar.display = false;
        }
    },
})
