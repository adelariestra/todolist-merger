import { createWriteStream, PathLike } from "fs";
import { SingleContent } from "../content";

export default function writeOutput(title: String, outPath:PathLike, output: Array<SingleContent>) {

    // OPEN
    let wStream = createWriteStream(outPath, { flags : 'w' });

    wStream.write(`# ${title} \n---`)
    
    output.forEach((outputItem)=>{
        wStream.write(`${outputItem.name}\n`);;
        wStream.write(`${outputItem.content}\n`);;
    })

    // CLOSE
    wStream.write("\n---");
    wStream.close();
}

// // OPEN
// let wStream = FS.createWriteStream(outPath, { flags : 'w' });
// wStream.write(`# TODOs - ${Path.basename(rootDir.toString())}\n---`)
// // FILES
// wStream.write(`\n${"#".repeat(directoriesStack.length + 1)} ${getName(filePath)}\n`);;
// let items: String = getFileTODOItems(filePath, onlyPending);
// wStream.write(`${items}\n`);
// // DIRECTORIES
// directoriesStack.push(directoryPath.toString());
// wStream.write(`\n${"#".repeat(directoriesStack.length)} ${getName(directoryPath)}`);;

// // CLOSE
// wStream.write("\n---");
// wStream.close();