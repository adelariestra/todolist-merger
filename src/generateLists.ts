import * as FS from 'fs';
import * as Path from 'path';

import { itereateFiles } from './readFiles'
import { } from './readToDoLists'

export default function generateTODOLists(rootDir: FS.PathLike) {
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