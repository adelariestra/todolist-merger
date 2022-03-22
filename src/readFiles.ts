import * as fs from 'fs';
import * as path from 'path';

export default function readDirectory(rootDir:any) {
    return fs.readdirSync(rootDir);
}
