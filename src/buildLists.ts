import * as FS from 'fs';
import * as Path from 'path';

import { itereateFiles } from './iterateFiles'
import { getFileTODOItems } from './readToDoLists'

export function buildTODOLists(rootDir: FS.PathLike) {
    let directoriesStack: String[] = ["General"];
    let result: String = `# TODOs - ${rootDir}\n---`;

    itereateFiles(
        rootDir,
        (filePath: String) => {
            // Add Title
            result = result.concat(`\n${"#".repeat(directoriesStack.length + 1)} ${Path.basename(filePath.toString())}\n`);

            // Add items
            let items: String = "ITEMS"; //TODO: get items
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

export function buildFilesList(rootDir: FS.PathLike): String[] {
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

export function buildTODOItemsList(rootDir: any): String[] {
    let items: String[] = [];
    itereateFiles(
        rootDir,
        (path: FS.PathOrFileDescriptor) => {
            items = items.concat(getFileTODOItems(path));
        },
        () => { },
        () => { }
    )
    return items.filter(item => item != "");
}