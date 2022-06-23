import * as Path from 'path';

// Skipping
export let skipNonTextFiles: Function = (path: string) => {
    return ![".txt", ".md", ""].includes(Path.extname(path));
};
export let skipGitFiles: Function = (path: string) => {
    return [".git"].includes(Path.extname(path));
};

// Access Metadata
export let getName: Function = (path: String) => {
    return Path.basename(path.toString());
};
