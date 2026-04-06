import genDiff from '../src/formatters/index.js';
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

/*TESTS PLAIN*/

describe('gendiff plain', () => {
  test('Comparacion de archivos anidados con formato plain', () => {
    const filePath1 = path.resolve(__dirname, '__fixtures__/fileNested1.json');
    const filePath2 = path.resolve(__dirname, '__fixtures__/fileNested2.json');

    const expected = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From '[complex value]' to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;
    const diff = genDiff(getData(filePath1), getData(filePath2), 'plain');

    expect(diff).toBe(expected);
  });
});

/* Tests adicionales para cobertura */

describe('genDiff format handling', () => {
  test('genDiff sin formato devuelve estructura diff', () => {
    const data1 = { a: 1 };
    const data2 = { a: 2 };
    const diff = genDiff(data1, data2);
    expect(diff).toEqual([{ key: 'a', type: 'modified', oldValue: 1, newValue: 2 }]);
  });

  test('genDiff con formato desconocido lanza error', () => {
    const data1 = { a: 1 };
    const data2 = { a: 2 };
    expect(() => genDiff(data1, data2, 'unknown')).toThrow('Unknown format: unknown');
  });

  test('genDiff con formato stylish', () => {
    const data1 = { a: 1 };
    const data2 = { a: 2 };
    const result = genDiff(data1, data2, 'stylish');
    expect(result).toBe(`{\n  - a: 1\n  + a: 2\n}`);
  });

  test('genDiff con formato plain', () => {
    const data1 = { a: 1 };
    const data2 = { a: 2 };
    const result = genDiff(data1, data2, 'plain');
    expect(result).toBe(`Property 'a' was updated. From 1 to 2`);
  });
});

describe('gendiff con formato JSON', () => {
  test('gendiff esperado para JSON', () => {
    const expected = `[
  {
    "key": "follow",
    "value": false,
    "type": "removed"
  },
  {
    "key": "host",
    "value": "codica.io",
    "type": "unchanged"
  },
  {
    "key": "proxy",
    "value": "123.234.53.22",
    "type": "removed"
  },
  {
    "key": "timeout",
    "type": "modified",
    "oldValue": 50,
    "newValue": 20
  },
  {
    "key": "verbose",
    "value": true,
    "type": "added"
  }
]`;
    const result = JSON.stringify(genDiff(file1, file2), null, 2);
    expect(result).toBe(expected);
  });
});