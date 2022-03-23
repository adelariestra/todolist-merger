import { expect } from 'chai';
import { execFile, execFileSync, execSync } from 'child_process';
import * as FS from 'fs';
import * as Path from 'path';
import readDirectory from '../../src/readFiles';
import  {readToDoLists, readToDoItems } from '../../src/readToDoLists';
import setup from '../fixture/testSuiteSetup'

describe('File Reading', () => {
    let rootDir = './test/fixture/rootDir';
    before(() => {
        setup();
    });

    describe('General', () => {
        it('Can access the environments files', () => {
            let result = readDirectory(rootDir);
            expect(result.length).to.equal(3);
        });
    });

    describe('TO DO LIST Reading', () => {
        it('Can get to do lists', () => {
            let result = readToDoLists(rootDir);
            console.log(result);
            expect(result.length).to.equal(2);
        });
        
        it('Can get to do list items', () => {
            let result = readToDoItems(rootDir);
            console.log(result);
            expect(result.length).to.equal(4);
        });

        it.skip('Can get to do list only-completed items', () => {

        });

        it.skip('Doesnt fail if no to do items available', () => {

        });

    });


});