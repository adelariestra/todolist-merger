import * as FS from 'fs';
import * as Path from 'path';
import { itereateFiles } from './iterateFiles'

let rgxTODOList = new RegExp(`##(\\n|\\r| )+?TODO(\\n|\\r| )+?---(\\n|\\r| |.)+?---`)
let rgxTODOItem = new RegExp(`(\\t| )*- \\[( |X|-|O)\\]( )*.*(\\r| )*(\\n)`, "g");
let rgxTODOItemOnlyPending = new RegExp(`(\\t| )*- \\[( )\\]( )*.*(\\r| )*(\\n)`, "g");

// MAIN FUNCTIONS
export function getFileTODOItems(path: FS.PathOrFileDescriptor, onlyPending:Boolean=false): String {
    let todolist = getFileTODOList(path);
    
    //Obtener contenido sin titulo y lineas    
    return "";
}

//TODO: Remove?
export function getFileTODOItemsArray(path: FS.PathOrFileDescriptor): String[] {
    let todolist = getFileTODOList(path);
    let todoitems = todolist.match(rgxTODOItem) || [];
    todoitems = todoitems.map(item => item?.toString())

    return todoitems;
}

// AUX
export function getFileContent(path: FS.PathOrFileDescriptor): String {
    return FS.readFileSync(path, 'utf8');
}
export function getFileTODOList(path: FS.PathOrFileDescriptor): String {
    return getFileContent(path).match(rgxTODOList)?.toString() || "";
}