import * as FS from 'fs';
import * as Path from 'path';

export default function setup() {
    let rootDir = "./test/fixture/rootDir";
    FS.rmSync(rootDir, { force: true, recursive: true });
    FS.writeFileSync(`${rootDir}/FileWithMFS.txt`,
        `# FileWithMFS
---

---
## NOTES
---

---
## TODO
---
- [ ] Item1 pending
- [ ] Item2 pending
    - [ ] Item2b pending

---`
    );
    FS.writeFileSync(`${rootDir}/FileWithMFSPlus.txt`,
        `---
sources: [,]
categories: [,]
date: 20220323
---
# FileWithMFSPlus
---

---
## NOTES
---

---
## TODO
---
Test text:
- [X] Item3 Completed
- [O] Item4 With O

Hello
- [ ] Item5 pending
    - [-] Item5 with -

---`
    );
    FS.writeFileSync(`${rootDir}/EmptyFile.txt`,``);
    
    FS.mkdirSync(`${rootDir}/Subfolder1`);
    FS.writeFileSync(`${rootDir}/Subfolder1/EmptyFile.txt`,
    ``
    );
    FS.writeFileSync(`${rootDir}/Subfolder1/EmptyFile2.txt`,
    ``
    );

    FS.mkdirSync(`${rootDir}/Subfolder2`);
    FS.writeFileSync(`${rootDir}/Subfolder2/EmptyFile1.txt`,``);

    FS.mkdirSync(`${rootDir}/Subfolder2/Subfolder21`);
    FS.writeFileSync(`${rootDir}/Subfolder2/Subfolder21/EmptyFile1.txt`,``);

    FS.mkdirSync(`${rootDir}/Subfolder2/Subfolder22`);
}