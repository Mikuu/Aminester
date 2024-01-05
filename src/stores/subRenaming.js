import { defineStore } from 'pinia'
import { loadFiles, renameSubtitle, copyAndZipSubtitles } from "../../utils/subRenamingUtils";

export const useSubRenamingStore = defineStore('subRenaming', {
    state: () => ({
        config: {
            videoPath: "",
            subtitlePath: "",
        },

        filesInVideoPath: "",
        filesInSubtitlePath: "",
        generatedNewSubtitleFilenames: "",
    }),

    getters: {},

    actions: {
        loadVideoAndSubtitleFiles() {
            this.filesInVideoPath = loadFiles(this.config.videoPath).join("\n");
            this.filesInSubtitlePath = loadFiles(this.config.subtitlePath).join("\n");
        },

        generateNewSubtitleFilenames() {
            const videoFileNames = this.filesInVideoPath.split("\n").map(each => each.trim());
            const subFileNames = this.filesInSubtitlePath.split("\n").map(each => each.trim());

            this.generatedNewSubtitleFilenames = renameSubtitle(videoFileNames, subFileNames).join("\n");
        },

        clear() {
            this.filesInVideoPath = "";
            this.filesInSubtitlePath = "";
            this.generatedNewSubtitleFilenames = "";
        },

        create() {
            copyAndZipSubtitles(
                this.config.videoPath,
                this.config.subtitlePath,
                this.filesInSubtitlePath.split("\n").map(each => each.trim()),
                this.generatedNewSubtitleFilenames.split("\n").map(each => each.trim())
            )
            return true
        },

        reset() {
            this.config.videoPath = "";
            this.config.subtitlePath = "";
            this.clear();
        },
    }
})
