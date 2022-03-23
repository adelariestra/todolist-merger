import { expect } from 'chai';
import {buildTODOLists, buildFilesList} from '../../src/buildLists';
import { readToDoItems, readToDoLists } from '../../src/readToDoLists';
import setup from '../fixture/testSuiteSetup';

describe('File Reading', () => {
    let rootDir = './test/fixture/rootDir';
    before(() => {
        setup();
    });

    describe('General', () => {
        it('Can access the environments files', () => {
            let result = buildFilesList(rootDir);
            expect(result.length).to.equal(7);
        });
    });

    describe('TO DO LIST Reading', () => {
        it('Can get to do lists', () => {
            let result = readToDoLists(rootDir);
            expect(result.length).to.equal(2);
        });
        
        it('Can get to do list items', () => {
            let result = readToDoItems(rootDir);
            expect(result.length).to.equal(4);
        });

        it.skip('Can get to do list only-completed items', () => {

        });

        it.skip('Doesnt fail if no to do items available', () => {

        });

    });

    describe('Lists Generation', () => {
        it('Generates TO DO Lists', () => {
            let result = buildTODOLists(rootDir);
            expect(result.length).to.above(0);
        });
    });


});