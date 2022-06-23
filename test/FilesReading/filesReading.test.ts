import { expect } from 'chai';
import { getFileNames, getContents } from '../../src/todolists/buildLists';
import setup from './testSuiteSetup';

describe('File Reading', () => {
    let rootDir = './test/fixture/rootDir';
    let outPath = './test/fixture/rootDir/output.txt';

    before(() => {
        setup();
    });

    describe('General', () => {
        it('Can access the environments files', () => {
            let result = getFileNames(rootDir);
            expect(result.length).to.equal(7);
        });
    });

    describe('Files Reading', () => {
        it ('Can read the files under a directory', () => {
            let result = getContents(rootDir);
            expect(result.length).to.equal(7);
        });

    });


});