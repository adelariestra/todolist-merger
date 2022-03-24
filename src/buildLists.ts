import * as FS from 'fs';
import * as Path from 'path';

import { itereateFiles } from './iterateFiles'
import { getFileTODOItems, getFileTODOItemsArray, getFileTODOList } from './readToDoLists'

export function buildTODOListsOutput(rootDir: FS.PathLike, onlyPending:Boolean=false) {
    let directoriesStack: String[] = ["General"];
    let result: String = `# TODOs - ${rootDir}\n---`;

    itereateFiles(
        rootDir,
        (filePath: FS.PathOrFileDescriptor) => {
            // Add Title
            result = result.concat(`\n${"#".repeat(directoriesStack.length + 1)} ${Path.basename(filePath.toString())}\n`);

            // Add items
            let items: String = getFileTODOItems(filePath,onlyPending);
            result = result.concat(`${items}\n`)
        },
        (directoryPath: FS.PathLike) => {
            directoriesStack.push(directoryPath.toString());
            result = result.concat(`\n${"#".repeat(directoriesStack.length)} ${Path.basename(directoryPath.toString())}`);
        },
        () => {
            directoriesStack.pop();
        }
    );
    result = result.concat("\n---")
    return result;
}

export function buildFilesArray(rootDir: FS.PathLike): String[] {
    let allFiles: String[] = [];
    let ignoredFiles: String[] = [".git"] //TODO: envirnonment/configuration?

    itereateFiles(
        rootDir,
        (path: String) => allFiles.push(path),
        () => { },
        () => { },
        (path: String) => ignoredFiles.find(toIgnore => toIgnore == path)
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