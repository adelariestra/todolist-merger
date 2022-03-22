import './readFiles';
import yargs, { ArgumentsCamelCase } from 'yargs';


// Default Options
let rootDir = './test/fixture/rootDir';
let outDir = './test/fixture/output';

/*
Options:
- MergeType:
    - f (default): full file
    - t: todolists only
    - tp: todolists pending items only
- ReadType:
    - i (default): iterate recursivly through subfolders
    - ni: only root folder.

Parameters:
- rootDir: origin where to start iterating
- outputPath: path where to generate the output file.
*/

let argv = yargs
    .scriptName("todolist-merger")
    .usage('Usage: $0 -m [f, t, tp] -i [i, ni] -r rootDir -o outputDir')
    .example(
        "$0 -r \"./src\" -o \"./output\"",
        "Sets the root directory to ./src and the output directory to ./output."
    )
    .option("m", {
        alias: "mergeType",
        describe: "Which elements of the files will be merged.",
        type: "string",
        choices:["f","t","tp"],
        default:"f",
        nargs: 1
    })
    .option("i", {
        alias: "readType",
        describe: "How the folders will be read.",
        choices:["i","ni"],
        default:"i",
        type: "string",
        nargs: 1
    })
    .option("r", {
        alias: "rootDir",
        describe: "Folder Path from where to start reading.",
        default:".",
        type: "string",
        nargs: 1
    })
    .option("o", {
        alias: "outPath",
        describe: "Name of the file that will be generated.",
        default:"./output.txt",
        type: "string",
        nargs: 1
    })
    .describe("help", "Show help.")
    .argv

main(argv);

function main(inputArgs: any) {
    console.log(inputArgs);
}