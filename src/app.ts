import { getFilesContent } from './todolists/buildLists';
import { buildTODOListsOutput } from './todolists/buildLists';

export default function main(inputArgs: any) {
    console.log("Started Excecution");

    let result;

    switch (inputArgs.mergeType) {
        case 'a': //All files content
            result = getFilesContent(inputArgs.rootDir);
            break;
        case 't': // TO DO Lists
            result = buildTODOListsOutput(inputArgs.rootDir, false);

            break;
        case 'p': // Only pending TO DO List items
            result = buildTODOListsOutput(inputArgs.rootDir, true);

            break;

        default:
            break;
    }

    // TODO: Write output to file inputArgs.outPath
    // -- OPEN
    // let wStream = FS.createWriteStream(outPath, { flags : 'w' });
    // wStream.write(`# TODOs - ${Path.basename(rootDir.toString())}\n---`)
    // -- FILES
    // wStream.write(`\n${"#".repeat(directoriesStack.length + 1)} ${getName(filePath)}\n`);;
    // let items: String = getFileTODOItems(filePath, onlyPending);
    // wStream.write(`${items}\n`);
    // -- DIRECTORIES
    // directoriesStack.push(directoryPath.toString());
    // wStream.write(`\n${"#".repeat(directoriesStack.length)} ${getName(directoryPath)}`);;
    // -- CLOSE
    // wStream.write("\n---");
    // wStream.close();
}