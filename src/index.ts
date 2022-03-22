import * as fs from 'fs';
import * as path from 'path';

const rootDir = './test/fixture/02_Stdy';

fs.readdir(rootDir, (error,files)=>{
    files.forEach(file=>{
        console.log(file);
    })
})