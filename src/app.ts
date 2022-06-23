import { SingleContent } from './content';
import { getFilesContent } from './todolists/buildLists';
import writeOutput from './writing/writeFile';

export default function main(inputArgs: any) {
    console.log("Started Excecution");


    switch (inputArgs.mergeType) {
        case 'a': //All files content
            let result: Array<SingleContent> = [];
            result = getFilesContent(inputArgs.rootDir);
            writeOutput(inputArgs.rootDir, inputArgs.outPath, result);

            break;
        case 't': // TO DO Lists
            //TODO: Pending
            // result = buildTODOListsOutput(inputArgs.rootDir, false);

            break;
        case 'p': // Only pending TO DO List items
            //TODO: Pending
            // result = buildTODOListsOutput(inputArgs.rootDir, true);

            break;

        default:
            break;
    }
}