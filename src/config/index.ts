import data from './config.json'
export interface Configuration {
    DEFAULT_ROOT: string,
    DEFAULT_OUTPUT: string
}

let config: Configuration = data;
export default config;