import * as FS from 'fs';
import * as Path from 'path';

let allFiles: String[] = []; //TODO: instead of global variable, send as parameter in recusive function
let ignoredFiles: String[] = [".git"] //TODO: envirnonment/configuration?

export default function readDirectory(rootDir: any): String[] {
    itereateFiles(rootDir, (path:String)=>allFiles.push(path));
    return allFiles;
}

function itereateFiles(rootDir: FS.PathLike, action: Function) {
    FS
        .readdirSync(rootDir)
        .forEach(file => {
            if (ignoredFiles.find(toIgnore => toIgnore == file)) //TODO: improve
                return;
            const path = Path.join(rootDir.toString(), file);
            if (FS.statSync(path).isDirectory())
                return itereateFiles(path,action);
            else
                return action(path);
        });
}