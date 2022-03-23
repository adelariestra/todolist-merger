import * as FS from 'fs';
import * as Path from 'path';
import {itereateFiles} from './readFiles'

export default function readToDoLists(rootDir: any): String[] {
    let items:String[] = [];
    let result = itereateFiles(
        rootDir,
        (path: FS.PathOrFileDescriptor) => { items.push(getFileTODOList(path)) }
    )
    return items;
}

function getFileTODOList(path: FS.PathOrFileDescriptor):String {
    return FS.readFileSync(path, 'utf8');
}