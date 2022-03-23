import { expect } from 'chai';
import readDirectory from '../../src/readFiles';

describe('File Reading Test', () => {
    it('Can access the environments files', () => {
        let result = readDirectory('./test/fixture/rootDir');
        expect(result.length).to.above(0);
    });

});