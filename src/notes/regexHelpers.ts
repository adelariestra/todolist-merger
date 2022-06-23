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

