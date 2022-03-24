import yargs from 'yargs';
import { buildTODOListsOutput } from './buildLists';

let argv = yargs
    .scriptName("todolist-merger")
    .usage('Usage: $0 -m [f, t, tp] -i [i, ni] -r rootDir -o outputDir')
    .example(
        "$0 -r \"./src\" -o \"./output\"",
        "Sets the root directory to ./src and the output directory to ./output."
    )
    .option("m", {
        alias: "mergeType",
        describe: "Which elements of the files will be merged. a=all, t=todos, p=todopendings",
        type: "string",
        choices: ["a", "t", "p"],
        default: "f",
        nargs: 1
    })
    .option("i", {
        alias: "readType",
        describe: "How the folders will be read. i=iteration, ni=noiteration",
        choices: ["i", "n"],
        default: "i",
        type: "string",
        nargs: 1
    })
    .option("r", {
        alias: "rootDir",
        describe: "Folder Path from where to start reading.",
        default: ".",
        type: "string",
        nargs: 1
    })
    .option("o", {
        alias: "outPath",
        describe: "Name of the file that will be generated.",
        default: "./output.txt",
        type: "string",
        nargs: 1
    })
    .describe("help", "Show help.")
    .argv

main(argv);

function main(inputArgs: any) {
    let result;
    // inputArgs.mergeType ["a","t","p"]
    // inputArgs.readType ["i","n"]
    // inputArgs.rootDir
    // inputArgs.outPath
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