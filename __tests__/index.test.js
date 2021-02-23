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

const jsonNestedPath1 = getFixturePath('nested1.json');
const jsonNestedPath2 = getFixturePath('nested2.json');

const yamlPath1 = getFixturePath('file1.yml');
const yamlPath2 = getFixturePath('file2.yml');

const expectedFlat = readFile('expected_flat.txt');
const expectedStylish = readFile('expected_stylish.txt');

test('json_flat', () => {
  expect(genDiff(jsonPath1, jsonPath2)).toBe(expectedFlat);
});

test('yaml_flat', () => {
  expect(genDiff(yamlPath1, yamlPath2)).toBe(expectedFlat);
});

test('json_stylish', () => {
  expect(genDiff(jsonNestedPath1, jsonNestedPath2, 'stylish')).toBe(expectedStylish);
});
