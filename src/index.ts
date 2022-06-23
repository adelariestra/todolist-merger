import yargs from 'yargs';
import main from './app';
import { Configuration } from './config';

let config: Configuration = require('./config.json');

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

main(argv);