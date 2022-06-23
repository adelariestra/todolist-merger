import { expect } from 'chai';
import { buildFilesArray, getFilesContent } from '../../src/todolists/buildLists';
import setup from './testSuiteSetup';

describe('File Reading', () => {
    let rootDir = './test/fixture/rootDir';
    let outPath = './test/fixture/rootDir/output.txt';

    before(() => {
        setup();
    });

    describe('General', () => {
        it('Can access the environments files', () => {
            let result = buildFilesArray(rootDir);
            expect(result.length).to.equal(7);
        });
    });

    describe('Files Reading', () => {
        it ('Can read the files under a directory', () => {
            let result = getFilesContent(rootDir);
            expect(result.length).to.equal(7);
        });

    });


});