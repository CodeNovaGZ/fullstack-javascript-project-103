import { execFileSync } from 'child_process';
import path from 'path';

test('gendiff CLI imprime diff esperado', () => {
  const result = execFileSync('node', [
    path.resolve('./gendiff.js'),
    './__tests__/__fixtures__/file1.json',
    './__tests__/__fixtures__/file2.json'
  ], { encoding: 'utf-8' });

  expect(result.trim()).toBe(`{
  - follow: false
    host: codica.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});

test('gendiff CLI imprime diff esperado para YAML .yaml', () => {
  const result = execFileSync('node', [
    path.resolve('./gendiff.js'),
    './__tests__/__fixtures__/file3.yaml',
    './__tests__/__fixtures__/file4.yaml'
  ], { encoding: 'utf-8' });

  expect(result.trim()).toBe(`{
  - follow: false
    host: codica.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});

test('gendiff CLI imprime diff esperado para YAML .yml', () => {
  const result = execFileSync('node', [
    path.resolve('./gendiff.js'),
    './__tests__/__fixtures__/file3.yml',
    './__tests__/__fixtures__/file4.yml'
  ], { encoding: 'utf-8' });

  expect(result.trim()).toBe(`{
  - follow: false
    host: codica.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});
