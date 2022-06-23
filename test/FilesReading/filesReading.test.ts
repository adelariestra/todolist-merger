import { expect } from 'chai';
import { buildFilesArray, buildTODOItemsArray, buildTODOListsArray, buildTODOListsOutput } from '../../src/todolists/buildLists';
import setup from '../fixture/testSuiteSetup';

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

    describe('TO DO LIST Reading', () => {
        it('Can get to do lists', () => {
            let result = buildTODOListsArray(rootDir);
            expect(result.length).to.equal(2);
        });

        it('Can get to do list items', () => {
            let result = buildTODOItemsArray(rootDir);
            expect(result.length).to.equal(7);
        });

        it.skip('Can get to do list only-completed items', () => {

        });

        it.skip('Doesnt fail if no to do items available', () => {

        });

    });

    describe('Lists Generation', () => {
        it('Generates TO DO Lists', () => {
            buildTODOListsOutput(rootDir, outPath, false);
        });
        it('Generates TO DO Lists Only Pending', () => {
            buildTODOListsOutput(rootDir, outPath, true);
        });
    });


});