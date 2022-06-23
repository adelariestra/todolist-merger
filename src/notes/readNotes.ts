import * as FS from 'fs';
import { rgxEntersAndSpacesEnd, rgxSeparator, rgxTODOItem, rgxTODOItemsNotPending, rgxTODOList, rgxTODOListTitle } from './regexHelpers';

export function getSingleFileContent(path: FS.PathOrFileDescriptor): string {
    return FS.readFileSync(path, 'utf8');
}

export function getSingleFileTODOLists(path: FS.PathOrFileDescriptor, onlyPending: Boolean = false): string {
    let fileContent = getSingleFileContent(path);
    let todolist = getTODOListFromContent(fileContent);
    todolist = todolist.replace(rgxTODOListTitle, "");
    todolist = todolist.replace(rgxSeparator, "");

    if (onlyPending)
        todolist = todolist.replace(rgxTODOItemsNotPending, "");

    todolist = todolist.replace(rgxEntersAndSpacesEnd, "");

    return todolist;
}

// export function getFilesItemsArray(path: FS.PathOrFileDescriptor): string[] {
//     let fileContent = getFileContent(path);
//     let todolist = getTODOListFromContent(fileContent);
//     let items = todolist.match(rgxTODOItem) || [];
//     items = items.map(item => item?.toString())

//     return items;
// }

function getTODOListFromContent(fileContent:string): string {
    let rgxMatch = fileContent.match(rgxTODOList);
    return rgxMatch ? rgxMatch[0] : "";
}