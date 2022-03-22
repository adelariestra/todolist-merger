import * as FS from 'fs';
import * as Path from 'path';

let allFiles:String[] = [];
let ignoredFiles:String[]=[".git"] //TODO: envirnonment/configuration?

export default function readDirectory(rootDir: any): String[] {
    FS
        .readdirSync(rootDir)
        .forEach(file => {
            if(ignoredFiles.find(toIgnore=>toIgnore==file)) //TODO: improve
                return;
            const path = Path.join(rootDir, file);
            if (FS.statSync(path).isDirectory())
                return readDirectory(path);
            else
                return allFiles.push(path);
        });
    return allFiles;
}
