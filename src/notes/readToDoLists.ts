import * as FS from 'fs';

// AUX Regex
let rgxSectionRandomEnters: String = `(\\n|\\r| )+`;
let rgxSectionRandomTabs: String = `(\\t| )*`;
// FullList Regex
let rgxSectionTitle = `##${rgxSectionRandomEnters}TODO${rgxSectionRandomEnters}---(\\n|\\r)+`;
let rgxTODOListTitle = new RegExp(rgxSectionTitle);
let rgxTODOList = new RegExp(`${rgxSectionTitle}(\\n|\\r| |.)+?---`);
let rgxSeparator = new RegExp(`(\\n|\\r)?---`);
let rgxEntersAndSpacesEnd = new RegExp(`${rgxSectionRandomEnters}\0`, "g");
// Items Regex
let rgxTODOItem = new RegExp(`${rgxSectionRandomTabs}- \\[( |X|-|O)\\]( )*.*${rgxSectionRandomEnters}`, "g");
let rgxTODOItemsNotPending = new RegExp(`${rgxSectionRandomTabs}- \\[(X|-)\\]( )*.*${rgxSectionRandomEnters}`, "g");

// MAIN FUNCTIONS
export function getFileTODOItems(path: FS.PathOrFileDescriptor, onlyPending: Boolean = false): String {
    let todolist = getFileTODOList(path);
    //console.debug(">->-> File Content Got")
    todolist = todolist.replace(rgxTODOListTitle, "");
    //console.debug(">->-> Title Replaced")
    todolist = todolist.replace(rgxSeparator, "");
    //console.debug(">->-> Separator Removed")
    if (onlyPending)
        todolist = todolist.replace(rgxTODOItemsNotPending, "");
    //console.debug(">->-> Pendings Removed")
    todolist = todolist.replace(rgxEntersAndSpacesEnd, "");
    //console.debug(">->-> End Enters Removed")

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
    let fileContent = getFileContent(path); 
    //console.debug(">->-> File content got");
    let rgxMatch = fileContent.match(rgxTODOList);
    //console.debug(">->-> TODOLists matched");
    return rgxMatch ? rgxMatch[0] : "";
}