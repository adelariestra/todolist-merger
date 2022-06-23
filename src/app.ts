import { buildTODOListsOutput } from './todolists/buildLists';

export default function main(inputArgs: any) {
    console.log("Started Excecution");

    let result;

    switch (inputArgs.mergeType) {
        case 'a': //All files content

            break;
        case 't': // TO DO Lists
            result = buildTODOListsOutput(inputArgs.rootDir, inputArgs.outPath, false);

            break;
        case 'p': // Only pending TO DO List items
            result = buildTODOListsOutput(inputArgs.rootDir, inputArgs.outPath, true);

            break;

        default:
            break;
    }

    //TODO: Generate Output File with result
}