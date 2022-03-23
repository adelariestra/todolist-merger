import * as FS from 'fs';
import * as Path from 'path';


export default function readDirectory(rootDir: any): String[] {
    let allFiles: String[] = [];
    let ignoredFiles: String[] = [".git"] //TODO: envirnonment/configuration?

    itereateFiles(
        rootDir,
        (path: String) => allFiles.push(path),
        (path: String) => ignoredFiles.find(toIgnore => toIgnore == path)
    );

    return allFiles;
}

function itereateFiles(rootDir: FS.PathLike, fileAction: Function, shouldSkipFile: Function) {
    FS
        .readdirSync(rootDir)
        .forEach(file => {
            // FILES AND DIRECTORY SKIPPING
            if (shouldSkipFile(file))
                return;
            const path = Path.join(rootDir.toString(), file);

            if (FS.statSync(path).isDirectory()) {
                // DIRECTORY ACTIONS
                return itereateFiles(path, fileAction, shouldSkipFile);
            } else {
                // FILE ACTIONS
                return fileAction(path);
            }
        });
}