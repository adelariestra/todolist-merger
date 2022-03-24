import * as FS from 'fs';
import * as Path from 'path';
import { itereateFiles } from './iterateFiles'

let rgxTODOList = new RegExp(`##(\\n|\\r| )+?TODO(\\n|\\r| )+?---(\\n|\\r| |.)+?---`)
let rgxTODOItem = new RegExp(`(\\t| )*- \\[( |X|-|O)\\]( )*.*(\\r| )*(\\n)`, "g");
let rgxTODOItemOnlyPending = new RegExp(`(\\t| )*- \\[( )\\]( )*.*(\\r| )*(\\n)`, "g");

// MAIN FUNCTIONS
export function readToDoLists(rootDir: any): String[] {
    let items: String[] = [];
    itereateFiles(
        rootDir,
        (path: FS.PathOrFileDescriptor) => { items.push(getFileTODOList(path)) },
        () => { },
        () => { }
    )
    return items.filter(item => item != "");
}

export function getFileTODOItems(path: FS.PathOrFileDescriptor): String[] {
    // console.debug(`Started reading TO DO Items of ${path}`);

    let todolist = getFileTODOList(path);
    let todoitems = todolist.match(rgxTODOItem) || [];
    todoitems = todoitems.map(item => item?.toString())

    // console.debug(todoitems);

    return todoitems;
}

// AUX
function getFileContent(path: FS.PathOrFileDescriptor): String {
    return FS.readFileSync(path, 'utf8');
}
function getFileTODOList(path: FS.PathOrFileDescriptor): String {
    // console.debug(`Started reading TO DO List of ${path}`);
    return getFileContent(path).match(rgxTODOList)?.toString() || "";
}