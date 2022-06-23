import { createWriteStream, PathLike } from "fs";
import { SingleContent } from "../content";

export default function writeOutput(title: String, outPath:PathLike, output: Array<SingleContent>) {
    let wStream = createWriteStream(outPath, { flags : 'w' });

    wStream.write(`# ${title} \n---\n`)
    
    output.forEach((outputItem)=>{
        wStream.write(`## ${outputItem.name}\n---\n`);;
        wStream.write(`${outputItem.content}\n---\n`);;
    })

    wStream.close();
}