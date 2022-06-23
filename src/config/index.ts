import data from './config.json'
export interface Configuration {
    DEFAULT_ROOT: string,
    DEFAULT_OUTPUT: string,
    DEFAULT_MERGE: string
};

let config: Configuration = data;
export default config;