import * as Path from 'path';

// Skipping
export const skipNonTextFiles: Function = (path: string) => {
    return ![".txt", ".md", ""].includes(Path.extname(path));
};
export const skipGitFiles: Function = (path: string) => {
    return [".git"].includes(Path.extname(path));
};

// Access Metadata
export const getName: Function = (path: String) => {
    return Path.basename(path.toString());
};
