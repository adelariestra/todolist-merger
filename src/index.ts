import * as fs from 'fs';
import * as path from 'path';

const rootDir = './test/fixture/02_Stdy';
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

// print process.argv
var args = process.argv.slice(2);
args.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});

fs.readdir(rootDir, (error,files)=>{
    files.forEach(file=>{
        console.log(file);
    })
})