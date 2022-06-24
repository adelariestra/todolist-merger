import yargs from 'yargs';
import config from './config';
import { SingleContent } from './content';
import { getFullPath } from './filesystem/helpers';
import { buildContents, buildStructure, buildStructureGeneration, buildTODOLists } from './todolists/buildLists';
import writeOutput from './writing/writeFile';

const inputArgs: any = yargs
    .scriptName("todolist-merger")
    .usage('Usage: $0 -m [a, t, p, s, g] -i [i, n] -r rootDir -o outputDir')
    .example(
        "$0 -r \"./src\" -o \"./output\"",
        "Sets the root directory to ./src and the output directory to ./output."
    )
    .option("m", {
        alias: "mergeType",
        describe: "Which elements of the files will be merged. a=all, t=todos, p=todopendings, s=structure, g=generation",
        type: "string",
        choices: ["a", "t", "p", "s", "g"],
        default: config.DEFAULT_MERGE,
        nargs: 1
    })
    .option("i", {
        alias: "readType",
        describe: "How the folders will be read. i=iteration, n=noiteration",
        choices: ["i", "n"],
        default: "i",
        type: "string",
        nargs: 1
    })
    .option("r", {
        alias: "rootDir",
        describe: "Folder Path from where to start reading.",
        default: config.DEFAULT_ROOT,
        type: "string",
        nargs: 1
    })
    .option("o", {
        alias: "outPath",
        describe: "Name of the file that will be generated.",
        default: config.DEFAULT_OUTPUT,
        type: "string",
        nargs: 1
    })
    .describe("help", "Show help.")
    .argv

export default function main() {
    console.log(`Started Excecution with the following configuration:
        Root Dir: ${inputArgs.rootDir} (resolves to ${getFullPath(inputArgs.rootDir)})
        Output Path: ${inputArgs.outPath} (resolves to ${getFullPath(inputArgs.outPath)})
        Merge Type: ${inputArgs.mergeType}
    `);

    let result: Array<SingleContent> = [];

    switch (inputArgs.mergeType) {
        case 'a': //All files content
            result = buildContents(inputArgs.rootDir);

            break;
        case 't': // TO DO Lists
            result = buildTODOLists(inputArgs.rootDir, false);

            break;
        case 'p': // Only pending TO DO List items
            result = buildTODOLists(inputArgs.rootDir, true);

            break;

        case 's': // Only pending TO DO List items
            result = buildStructure(inputArgs.rootDir);
            break;

        case 'g': // Only pending TO DO List items
            result = buildStructureGeneration(inputArgs.rootDir);
            break;

        default:
            break;
    }
    writeOutput(inputArgs.rootDir, inputArgs.outPath, result);
}