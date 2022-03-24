import * as FS from 'fs';
import * as Path from 'path';

import { itereateFiles } from './iterateFiles'
import { getFileTODOItems, getFileTODOItemsArray, getFileTODOList } from './readToDoLists'

export function buildTODOListsOutput(rootDir: FS.PathLike, outPath: FS.PathLike, onlyPending: Boolean = false) {
    let directoriesStack: String[] = ["General"];
    let shouldSkipFile: Function = (path: string) => {
        return ![".txt", ".md", ""].includes(Path.extname(path))
    }
    
    let wStream = FS.createWriteStream(outPath, { flags : 'w' });
    wStream.write(`# TODOs - ${Path.basename(rootDir.toString())}\n---`)

    itereateFiles(
        rootDir,
        (filePath: FS.PathOrFileDescriptor) => {
            // Add Title
            wStream.write(`\n${"#".repeat(directoriesStack.length + 1)} ${Path.basename(filePath.toString())}\n`);;
            //console.debug(">-> File Title Written")
            // Add items
            let items: String = getFileTODOItems(filePath, onlyPending);
            //console.debug(">-> Items Gotten")
            wStream.write(`${items}\n`);
            //console.debug(">-> Items Written")
        },
        (directoryPath: FS.PathLike) => {
            directoriesStack.push(directoryPath.toString());
            wStream.write(`\n${"#".repeat(directoriesStack.length)} ${Path.basename(directoryPath.toString())}`);;
        },
        () => {
            directoriesStack.pop();
        },
        shouldSkipFile
    );
    wStream.write("\n---");
    wStream.close();
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