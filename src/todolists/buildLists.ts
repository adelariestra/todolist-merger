import * as FS from 'fs';
import * as Path from 'path';
import { SingleContent } from '../content';

import { itereateFiles } from '../filesystem/iterateFiles';
import { getSingleFileContent, getSingleFileTODOLists } from '../notes/readNotes';

// HELPERS
// Files Skipping
let skipNonTextFiles: Function = (path: string) => {
    return ![".txt", ".md", ""].includes(Path.extname(path));
}
let skipGitFiles:Function = (path: string) => {
    return [".git"].includes(Path.extname(path));
}
// File management
let getName: Function = (path:String)=>{
    return Path.basename(path.toString());
}

// ARRAYS
export function getFileNames(rootDir: FS.PathLike): String[] {
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

// MAIN FUNCTIONS
export function getContents(rootDir: FS.PathLike): Array<SingleContent>{
    let filesContent: Array<SingleContent> = [];

    itereateFiles(
        rootDir,
        (filePath: FS.PathOrFileDescriptor) => {
            filesContent.push({name: getName(filePath), content: getSingleFileContent(filePath)});
        },
        () => {},
        () => {},
        skipNonTextFiles
    );

    return filesContent;
}

export function getTODOLists(rootDir: FS.PathLike, onlyPending:boolean): Array<SingleContent>{
    let filesContent: Array<SingleContent> = [];

    itereateFiles(
        rootDir,
        (filePath: FS.PathOrFileDescriptor) => {
            filesContent.push({name: filePath.toString(), content: getSingleFileTODOLists(filePath, onlyPending)});
        },
        () => {},
        () => {},
        skipNonTextFiles
    );

    return filesContent;
}

// export function buildTODOItemsArray(rootDir: any): String[] {
//     let items: String[] = [];
//     itereateFiles(
//         rootDir,
//         (path: FS.PathOrFileDescriptor) => {
//             items = items.concat(getFileTODOItemsArray(path));
//         },
//         () => { },
//         () => { }
//     )
//     return items.filter(item => item != "");
// }

// export function buildTODOListsArray(rootDir: any): String[] {
//     let items: String[] = [];
//     itereateFiles(
//         rootDir,
//         (path: FS.PathOrFileDescriptor) => {
//             items = items.concat(getFileTODOList(path));
//         },
//         () => { },
//         () => { }
//     )
//     return items.filter(item => item != "");
// }