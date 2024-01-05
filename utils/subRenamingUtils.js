const fs = window.require("fs");
const path = window.require("path");
const archiver = window.require("archiver");

export const loadFiles = (directoryPath) => {
    try {
        return  fs.readdirSync(directoryPath);
    } catch (error) {
        console.error(`Error listing files in directory ${directoryPath}: ${error.message}`);
        return [];
    }
}

export const renameSubtitle = (videoList, subList) => {
    return subList.map((subName, index) => {
        const videoName = videoList[index];
        const videoNameWithoutExtension = videoName.replace(/\.[^/.]+$/, '');
        const subExtension = subName.split('.').pop();
        return `${videoNameWithoutExtension}.${subExtension}`;
    });
}

export const copyAndZipSubtitles = (videoPath, oriSubtitlePath, oriSubtitleList, newSubtitleList) => {
    const output = fs.createWriteStream(path.join(videoPath, 'SUB.zip'));
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.pipe(output);

    const tempFolder = path.join(videoPath, 'tempFolder');
    fs.mkdirSync(tempFolder);

    oriSubtitleList.forEach((oriSubtitle, index) => {
        const newSubtitle = newSubtitleList[index];
        if (newSubtitle) {
            const oriSubtitleFilePath = path.join(oriSubtitlePath, oriSubtitle);
            const newSubtitleFileInTempFolderPath = path.join(tempFolder, newSubtitle);
            fs.copyFileSync(oriSubtitleFilePath, newSubtitleFileInTempFolderPath);

            archive.append(fs.createReadStream(newSubtitleFileInTempFolderPath), { name: newSubtitle });
        }
    });

    archive.finalize();

    output.on('close', () => {
        console.log(`ZIP file SUB.zip created successfully.`);

        const filesInTempFolder = fs.readdirSync(tempFolder);

        if (filesInTempFolder.length === 1) {
            const fileToKeep = filesInTempFolder[0];
            fs.copyFileSync(path.join(tempFolder, fileToKeep), path.join(videoPath, fileToKeep));
        }

        if (filesInTempFolder.length >= 2) {
            const fileToKeep = filesInTempFolder[1];
            fs.copyFileSync(path.join(tempFolder, fileToKeep), path.join(videoPath, fileToKeep));
        }

        fs.rmdirSync(tempFolder, { recursive: true });
    });

    archive.on('error', (error) => {
        console.error('Error creating ZIP file:', error);
    });
}
