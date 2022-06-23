import * as FS from 'fs';
import * as Path from 'path';

export function itereateFiles(rootDir: FS.PathLike, fileAction: Function, directoryAction: Function, levelUpAction: Function, shouldSkipFile: Function = () => { return false }) {
    FS
        .readdirSync(rootDir)
        .forEach(file => {
            // console.debug(`> File: ${file}`);
            
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