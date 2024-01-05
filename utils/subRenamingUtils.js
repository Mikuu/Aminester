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

    // 将输出流连接到 archiver
    archive.pipe(output);

    // 创建临时文件夹
    const tempFolder = path.join(videoPath, 'tempFolder');
    fs.mkdirSync(tempFolder);

    oriSubtitleList.forEach((oriSubtitle, index) => {
        const newSubtitle = newSubtitleList[index];
        if (newSubtitle) {
            const oriSubtitleFilePath = path.join(oriSubtitlePath, oriSubtitle);
            const newSubtitleFileInTempFolderPath = path.join(tempFolder, newSubtitle);
            fs.copyFileSync(oriSubtitleFilePath, newSubtitleFileInTempFolderPath);
            // 将新字幕文件添加到 ZIP 中
            archive.append(fs.createReadStream(newSubtitleFileInTempFolderPath), { name: newSubtitle });
        }
    });

    // // 复制新字幕文件到临时文件夹
    // newSubtitleList.forEach((newSubtitle) => {
    //     const newSubtitleFilePath = path.join(tempFolder, newSubtitle);
    //     fs.copyFileSync(path.join(videoPath, newSubtitle), newSubtitleFilePath);
    //     // 将新字幕文件添加到 ZIP 中
    //     archive.append(fs.createReadStream(newSubtitleFilePath), { name: newSubtitle });
    // });

    // 完成压缩并关闭输出流
    archive.finalize();

    output.on('close', () => {
        console.log(`ZIP file SUB.zip created successfully.`);

        // 获取临时文件夹中的文件列表
        const filesInTempFolder = fs.readdirSync(tempFolder);

        // 如果临时文件夹里面只有一个新字幕文件，将其复制到外层的videoPath路径下
        if (filesInTempFolder.length === 1) {
            const fileToKeep = filesInTempFolder[0];
            fs.copyFileSync(path.join(tempFolder, fileToKeep), path.join(videoPath, fileToKeep));
        }

        // 如果临时文件夹里面有大于等于两个新字幕文件，将第二个新字幕文件复制到外层的videoPath路径下
        if (filesInTempFolder.length >= 2) {
            const fileToKeep = filesInTempFolder[1];
            fs.copyFileSync(path.join(tempFolder, fileToKeep), path.join(videoPath, fileToKeep));
        }

        // 删除临时文件夹
        fs.rmdirSync(tempFolder, { recursive: true });
    });

    archive.on('error', (error) => {
        console.error('Error creating ZIP file:', error);
    });
}
