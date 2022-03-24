import * as FS from 'fs';
import * as Path from 'path';
import { itereateFiles } from './iterateFiles'

// AUX Regex
let rgxSectionRandomEnters: String = `(\\n|\\r| )+`;
let rgxSectionRandomTabs: String = `(\\t| )*`;
// FullList Regex
let rgxSectionTitle = `##${rgxSectionRandomEnters}TODO${rgxSectionRandomEnters}---(\\n|\\r)+`;
let rgxTODOListTitle = new RegExp(rgxSectionTitle);
let rgxTODOList = new RegExp(`${rgxSectionTitle}(\\n|\\r| |.)+?---`);
let rgxSeparator = new RegExp(`(\\n|\\r)?---`);
let rgxEntersAndSpacesEnd = new RegExp(`${rgxSectionRandomEnters}\0`,"g");
// Items Regex
let rgxTODOItem = new RegExp(`${rgxSectionRandomTabs}- \\[( |X|-|O)\\]( )*.*${rgxSectionRandomEnters}`, "g");
let rgxTODOItemsNotPending = new RegExp(`${rgxSectionRandomTabs}- \\[(X|-)\\]( )*.*${rgxSectionRandomEnters}`, "g");

// MAIN FUNCTIONS
export function getFileTODOItems(path: FS.PathOrFileDescriptor, onlyPending: Boolean = false): String {
    let todolist = getFileTODOList(path);

    todolist = todolist.replace(rgxTODOListTitle, "");
    todolist = todolist.replace(rgxSeparator, "");
    if (onlyPending)
        todolist = todolist.replace(rgxTODOItemsNotPending, "");
    todolist = todolist.replace(rgxEntersAndSpacesEnd, "");

    return todolist;
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
    let rgxMatch = getFileContent(path).match(rgxTODOList);
    return rgxMatch ? rgxMatch[0] : "";
}