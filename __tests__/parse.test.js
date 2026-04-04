import file1 from './__fixtures__/file1.json';
import file2 from './__fixtures__/file2.json';
import parse from '../src/parser.js';

test('parse file1', () => {
    const data = parse('./__tests__/__fixtures__/file1.json');
    expect(data).toEqual(file1);
});

test('parse file2', () => {
    const data = parse('./__tests__/__fixtures__/file2.json');
    expect(data).toEqual(file2);
});

test('parse throws error when file does not exist', () => {
    expect(() => parse('./__tests__/__fixtures__/missing.json')).toThrow();
});

test('parse throws error for invalid JSON', () => {
    expect(() => parse('./__tests__/__fixtures__/invalid.json')).toThrow(SyntaxError);
});