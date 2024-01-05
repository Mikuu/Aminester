import { defineStore } from 'pinia'
import { moveFolders } from "../../utils/flattenUtils";

export const useDirectoryFlattenStore = defineStore('directoryFlatten', {
    state: () => ({
        config: {
            flattenPath: "",
            depth: 1,
        },
    }),

    getters: {},

    actions: {
        flatten() {
            return moveFolders(this.config.flattenPath, this.config.depth);
        },
    }
})
