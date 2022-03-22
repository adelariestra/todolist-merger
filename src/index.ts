import './readFiles';
import yargs from 'yargs';


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

// MAIN
let args = process.argv.slice(2);
parseOptions(args);
printOptions(args);


// AUX FUNCTIONS
function parseOptions(params:String[]) {
    rootDir= params[0]?.toString();
    outDir= params[1]?.toString();
}

function printOptions(params:String[]) {
    args.forEach(function (val, index, array) {
        console.log(index + ': ' + val);
    });

    console.log("--- Options ---");
    console.log(`Root Directory: ${rootDir}`);
    console.log(`Output Directory: ${outDir}`);
}