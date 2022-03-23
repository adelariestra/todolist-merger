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
- [ ] Item1
- [ ] Item2

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
- [ ] Item3
- [ ] Item4

---`
    );
    FS.writeFileSync(`${rootDir}/EmptyFiles.txt`,
        ``
    );
}