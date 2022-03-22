import * as fs from 'fs';
import * as path from 'path';

export default function readDirectory(rootDir:any) {
    fs.readdir(rootDir, (error,files)=>{
        files.forEach(file=>{
            console.log(file);
        })
    })
}
