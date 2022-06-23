import * as FS from 'fs';
import * as Path from 'path';

import { itereateFiles } from '../filesystem/iterateFiles';
import { getFileContent, getFileTODOItemsArray, getFileTODOList } from '../notes/readNotes';

// HELPERS
// Files Skipping
let skipNonTextFiles: Function = (path: string) => {
    return ![".txt", ".md", ""].includes(Path.extname(path));
}
let skipGitFiles:Function = (path: string) => {
    return [".git"].includes(Path.extname(path));
}

// MAIN FUNCTIONS
export function getFilesContent(rootDir: FS.PathLike): String[]{
    let filesContent: String[] = [];

    itereateFiles(
        rootDir,
        (filePath: FS.PathOrFileDescriptor) => {
            filesContent.push(getFileContent(filePath));
        },
        () => {},
        () => {},
        skipNonTextFiles
    );

    return filesContent;
}

export function buildTODOListsOutput(rootDir: FS.PathLike, onlyPending: Boolean = false) {
    let directoriesStack: String[] = ["General"];
    let getName: Function = (path:String)=>{
        return Path.basename(path.toString());
    }

    itereateFiles(
        rootDir,
        (filePath: FS.PathOrFileDescriptor) => {
 
        },
        (directoryPath: FS.PathLike) => {
            
        },
        () => {
            directoriesStack.pop();
        },
        skipNonTextFiles
    );

}

export function buildFilesArray(rootDir: FS.PathLike): String[] {
    let allFiles: String[] = [];

    itereateFiles(
        rootDir,
        (path: String) => allFiles.push(path),
        () => { },
        () => { },
        skipGitFiles
    );

    return allFiles;
}

export function buildTODOItemsArray(rootDir: any): String[] {
    let items: String[] = [];
    itereateFiles(
        rootDir,
        (path: FS.PathOrFileDescriptor) => {
            items = items.concat(getFileTODOItemsArray(path));
        },
        () => { },
        () => { }
    )
    return items.filter(item => item != "");
}

export function buildTODOListsArray(rootDir: any): String[] {
    let items: String[] = [];
    itereateFiles(
        rootDir,
        (path: FS.PathOrFileDescriptor) => {
            items = items.concat(getFileTODOList(path));
        },
        () => { },
        () => { }
    )
    return items.filter(item => item != "");
}