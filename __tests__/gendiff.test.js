import genDiff from '../src/genDiff.js';
import getData from '../src/parser.js';
import path from 'path';
import formatStylish from '../src/formatters/stylish.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import file1 from './__fixtures__/file1.json';
import file2 from './__fixtures__/file2.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/* Tests JSON */
describe('gendiff', () => {
    test('Comparacion de archivos con gendiff', () => {
        const expected = `{
  - follow: false
    host: codica.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

        expect(formatStylish(genDiff(file1, file2))).toBe(expected);
    });

    test('gendiff solo clave añadida', () => {
        expect(formatStylish(genDiff({ host: 'hexlet.io' }, { host: 'hexlet.io', proxy: '123.234.53.22' })))
            .toBe(`{\n    host: hexlet.io\n  + proxy: 123.234.53.22\n}`);
    });

    test('gendiff solo clave eliminada', () => {
        expect(formatStylish(genDiff({ host: 'hexlet.io', proxy: '123.234.53.22' }, { host: 'hexlet.io' })))
            .toBe(`{\n    host: hexlet.io\n  - proxy: 123.234.53.22\n}`);
    });

    test('gendiff mantiene orden alfabético de claves', () => {
        const data1 = { b: 1, a: 2 };
        const data2 = { a: 2, b: 1 };

        expect(formatStylish(genDiff(data1, data2))).toBe(`{\n    a: 2\n    b: 1\n}`);
    });
});

/* Tests YAML */

describe('gendiff YAML', () => {
    test('Comparacion de archivos YAML con gendiff', () => {
        const expected = `{
  - follow: false
    host: codica.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
        const filePath1 = path.resolve(__dirname, '__fixtures__/file3.yaml');
        const filePath2 = path.resolve(__dirname, '__fixtures__/file4.yaml');

        expect(formatStylish(genDiff(getData(filePath1), getData(filePath2)))).toBe(expected);
    });
});

/*Tests Nested*/

describe('gendiff nested', () => {
  test('Comparacion de archivos anidados', () => {
    const filePath1 = path.resolve(__dirname, '__fixtures__/fileNested1.json');
    const filePath2 = path.resolve(__dirname, '__fixtures__/fileNested2.json');

    const expected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;
    const diff = genDiff(getData(filePath1), getData(filePath2));

    expect(formatStylish(diff)).toBe(expected);
  });
});