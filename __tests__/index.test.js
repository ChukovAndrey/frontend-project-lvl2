import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import genDiff from '../src/genFilesDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const jsonPath1 = getFixturePath('file1.json');
const jsonPath2 = getFixturePath('file2.json');

const yamlPath1 = getFixturePath('file1.yml');
const yamlPath2 = getFixturePath('file2.yml');

const expectedStylish = readFile('expected_stylish.txt');
const expectedPlain = readFile('expected_plain.txt');
const expectedJson = readFile('expected_json.txt');

const testData = [
  [undefined, expectedStylish],
  ['stylish', expectedStylish],
  ['plain', expectedPlain],
  ['json', expectedJson],
];

describe.each(testData)('case id=%#', (format, expected) => {
  test(`json files with ${format} formatter`, () => {
    expect(genDiff(jsonPath1, jsonPath2, format)).toBe(expected);
  });

  test(`yaml files with ${format} formatter`, () => {
    expect(genDiff(yamlPath1, yamlPath2, format)).toBe(expected);
  });
});
