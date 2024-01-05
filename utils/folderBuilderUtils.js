const fs = window.require("fs");
const path = window.require("path");

const PASSCODING_FILENAME = "Passcodes.txt";

export const createFolders = (rootPath, subjectNames) => {
    if (!fs.existsSync(rootPath)) {
        console.error(`Error: Root path "${rootPath}" does not exist.`);
        return;
    }

    const existingDirectories = subjectNames.filter(subjectName => {
        const subjectPath = path.join(rootPath, subjectName);
        return fs.existsSync(subjectPath);
    });

    if (existingDirectories.length > 0) {
        console.warn(`Error: Directories ${existingDirectories.join(', ')} already exist. Stopping.`);
        return;
    }

    subjectNames.forEach(subjectName => {
        const subjectPath = path.join(rootPath, subjectName);
        fs.mkdirSync(subjectPath);
        console.log(`Directory "${subjectPath}" created successfully.`);
    });

    return true;
}

export const createPasscodingFile = (directoryPath, passcodes) => {
    try {
        const fileContent = passcodes.map(subject => {
            return `${subject.name}: ${subject.passcode}`;
        }).join('\n');

        const filePath = path.join(directoryPath, PASSCODING_FILENAME);
        fs.writeFileSync(filePath, fileContent);

        console.log(`Passcoding file created successfully at ${filePath}`);
        return true;
    } catch (error) {
        console.error(`Error creating Passcoding file: ${error.message}`);
        return false;
    }
}
