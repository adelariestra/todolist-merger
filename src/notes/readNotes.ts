import * as FS from 'fs';
import { rgxEntersAndSpacesEnd, rgxSeparator, rgxTODOItem, rgxTODOItemsNotPending, rgxTODOList, rgxTODOListTitle } from './regexHelpers';

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
export function getFileTODOItemsArray(path: FS.PathOrFileDescriptor): string[] {
    let todolist = getFileTODOList(path);
    let todoitems = todolist.match(rgxTODOItem) || [];
    todoitems = todoitems.map(item => item?.toString())

    return todoitems;
}

// AUX
export function getFileContent(path: FS.PathOrFileDescriptor): string {
    return FS.readFileSync(path, 'utf8');
}
export function getFileTODOList(path: FS.PathOrFileDescriptor): string {
    let fileContent = getFileContent(path); 
    let rgxMatch = fileContent.match(rgxTODOList);
    return rgxMatch ? rgxMatch[0] : "";
}