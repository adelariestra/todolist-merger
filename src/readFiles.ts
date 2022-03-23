import * as FS from 'fs';
import * as Path from 'path';


export default function readDirectory(rootDir: FS.PathLike): String[] {
    let allFiles: String[] = [];
    let ignoredFiles: String[] = [".git"] //TODO: envirnonment/configuration?

    itereateFiles(
        rootDir,
        (path: String) => allFiles.push(path),
        () => { },
        () => { },
        (path: String) => ignoredFiles.find(toIgnore => toIgnore == path)
    );

    return allFiles;
}

export function itereateFiles(rootDir: FS.PathLike, fileAction: Function, directoryAction: Function, levelUpAction: Function, shouldSkipFile: Function = () => { return false }) {
    FS
        .readdirSync(rootDir)
        .forEach(file => {
            // FILES AND DIRECTORY SKIPPING
            if (shouldSkipFile(file))
                return;
            const path = Path.join(rootDir.toString(), file);

            if (FS.statSync(path).isDirectory()) {
                // DIRECTORY ACTIONS
                directoryAction(path);
                return itereateFiles(path, fileAction, directoryAction, levelUpAction, shouldSkipFile);
            } else {
                // FILE ACTIONS
                return fileAction(path);
            }
        });
    levelUpAction(rootDir);
}