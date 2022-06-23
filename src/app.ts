import yargs from 'yargs';
import config from './config';
import { SingleContent } from './content';
import { getFilesContent } from './todolists/buildLists';
import writeOutput from './writing/writeFile';


const inputArgs:any = yargs
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
        default: "a",
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