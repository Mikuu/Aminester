const fs = window.require("fs");
const path = window.require("path");

const moveContentsRecursive = (topPath, source, target) => {
    const items = fs.readdirSync(source);

    items.forEach((item) => {
        const sourcePath = path.join(source, item);
        const targetPath = path.join(target, item);

        if (fs.statSync(sourcePath).isDirectory()) {
            moveContentsRecursive(topPath, sourcePath, targetPath);
            // fs.rmdirSync(sourcePath, { recursive: true });

        } else {
            const topTargetPath = path.join(topPath, item);
            fs.renameSync(sourcePath, topTargetPath);
        }
    });
}

const moveContents = (source, target) => {
    const items = fs.readdirSync(source);

    items.forEach((item) => {
        const sourcePath = path.join(source, item);
        const targetPath = path.join(target, item);

        if (fs.statSync(sourcePath).isFile()) {
            fs.renameSync(sourcePath, targetPath);
        }
    });
}

export const moveFolders = (directoryPath, depth) => {
    try {
        const items = fs.readdirSync(directoryPath);

        items.forEach((item) => {
            const itemPath = path.join(directoryPath, item);

            if (fs.statSync(itemPath).isDirectory()) {
                if (depth === 0) {
                    moveContentsRecursive(directoryPath, itemPath, directoryPath);
                    // fs.rmdirSync(itemPath, { recursive: true });

                } else if (depth === 1) {
                    moveContents(itemPath, directoryPath);
                    // fs.rmdirSync(itemPath, { recursive: true });
                } else {
                    console.log(`depth value is invalid, "${depth}"`);
                }
            }
        });

        console.log('Files moved successfully.');
    } catch (error) {
        console.error('Error moving files:', error);
        return false;
    }

    return true
}

