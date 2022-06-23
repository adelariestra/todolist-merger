// AUX Regex
export const rgxSectionRandomEnters: String = `(\\n|\\r| )+`;
export const rgxSectionRandomTabs: String = `(\\t| )*`;

// FullList Regex
export const rgxSectionTitle = `##${rgxSectionRandomEnters}TODO${rgxSectionRandomEnters}---(\\n|\\r)+`;
export const rgxTODOListTitle = new RegExp(rgxSectionTitle);
export const rgxTODOList = new RegExp(`${rgxSectionTitle}(\\n|\\r| |.)+?---`);
export const rgxSeparator = new RegExp(`(\\n|\\r)?---`);
export const rgxEntersAndSpacesEnd = new RegExp(`${rgxSectionRandomEnters}\0`, "g");

// Items Regex
export const rgxTODOItem = new RegExp(`${rgxSectionRandomTabs}- \\[( |X|-|O)\\]( )*.*${rgxSectionRandomEnters}`, "g");
export const rgxTODOItemsNotPending = new RegExp(`${rgxSectionRandomTabs}- \\[(X|-)\\]( )*.*${rgxSectionRandomEnters}`, "g");