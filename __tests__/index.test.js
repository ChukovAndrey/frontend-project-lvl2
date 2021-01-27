import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const jsonPath1 = getFixturePath('file1.json');
const jsonPath2 = getFixturePath('file2.json');

const yamlPath1 = getFixturePath('file1.yaml');
const yamlPath2 = getFixturePath('file2.yaml');

const expected = readFile('expected.txt');

test('json_flat', () => {
  expect(genDiff(jsonPath1, jsonPath2)).toBe(expected);
});

test('yaml_flat', () => {
  expect(genDiff(yamlPath1, yamlPath2)).toBe(expected);
});
