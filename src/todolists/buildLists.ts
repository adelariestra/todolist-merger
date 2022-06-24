import * as FS from 'fs';
import { SingleContent } from '../content';

import { itereateFiles } from '../filesystem/iteration';
import { getSingleFileContent, getSingleFileTODOLists } from '../notes/readNotes';
import { skipGitFiles, getName, skipNonTextFiles } from '../filesystem/helpers';

// ARRAYS
export function buildFileNames(rootDir: FS.PathLike): String[] {
    let allFiles: String[] = [];

    itereateFiles(
        rootDir,
        (path: String) => allFiles.push(path),
        () => { },
        () => { },
        skipGitFiles
    );

    return allFiles;
};

// MAIN FUNCTIONS
export function buildContents(rootDir: FS.PathLike): Array<SingleContent>{
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
};

export function buildTODOLists(rootDir: FS.PathLike, onlyPending:boolean): Array<SingleContent>{
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