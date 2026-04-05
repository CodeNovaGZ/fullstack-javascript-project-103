import genDiff from '../src/genDiff.js';
import getData from '../src/parser.js';
import file1 from './__fixtures__/file1.json';
import file2 from './__fixtures__/file2.json';

/* Tests JSON */
describe('gendiff', () => {
    test('Comparacion de archivos con gendiff', () => {
        const expected = `- follow: false
  host: codica.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true`;

        expect(genDiff(file1, file2)).toBe(expected);
    });

    test('gendiff solo clave añadida', () => {
        expect(genDiff({ host: 'hexlet.io' }, { host: 'hexlet.io', proxy: '123.234.53.22' }))
            .toBe(`  host: hexlet.io\n+ proxy: 123.234.53.22`);
    });

    test('gendiff solo clave eliminada', () => {
        expect(genDiff({ host: 'hexlet.io', proxy: '123.234.53.22' }, { host: 'hexlet.io' }))
            .toBe(`  host: hexlet.io\n- proxy: 123.234.53.22`);
    });

    test('gendiff mantiene orden alfabético de claves', () => {
        const data1 = { b: 1, a: 2 };
        const data2 = { a: 2, b: 1 };

        expect(genDiff(data1, data2)).toBe(`  a: 2\n  b: 1`);
    });
});

/* Tests YAML */

describe('gendiff YAML', () => {
    test('Comparacion de archivos YAML .yaml con gendiff', () => {
        const expected = `- follow: false
  host: codica.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true`;

        expect(genDiff(getData('./__tests__/__fixtures__/file3.yaml'), getData('./__tests__/__fixtures__/file4.yaml'))).toBe(expected);
    });

    test('Comparacion de archivos YAML .yml con gendiff', () => {
        const expected = `- follow: false
  host: codica.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true`;

        expect(genDiff(getData('./__tests__/__fixtures__/file3.yml'), getData('./__tests__/__fixtures__/file4.yml'))).toBe(expected);
    });
});
