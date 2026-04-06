import file1 from './__fixtures__/file1.json';
import file2 from './__fixtures__/file2.json';
import parse from '../src/parser.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('parse file1', () => {
    const data = parse('./__tests__/__fixtures__/file1.json');
    expect(data).toEqual(file1);
});

test('parse file2', () => {
    const data = parse('./__tests__/__fixtures__/file2.json');
    expect(data).toEqual(file2);
});

test('recibe archivo inexistente', () => {
    expect(() => parse('./__tests__/__fixtures__/missing.json')).toThrow();
});

test('recibe archivo JSON inválido', () => {
    expect(() => parse('./__tests__/__fixtures__/invalid.json')).toThrow();
});

test('recibe archivo YAML inexistente', () => {
    expect(() => parse('./__tests__/__fixtures__/missing.yml')).toThrow();
});

test('recibe archivo YAML inválido', () => {
    expect(() => parse('./__tests__/__fixtures__/invalid.yml')).toThrow();
});

test('parse archivo YAML .yml', () => {
    const data = parse('./__tests__/__fixtures__/file3.yml');

    expect(data).toEqual({
        host: 'codica.io',
        timeout: 50,
        proxy: '123.234.53.22',
        follow: false,
    });
});

test('parse archivo YAML .yaml', () => {
    const data = parse('./__tests__/__fixtures__/file3.yaml');

    expect(data).toEqual({
        host: 'codica.io',
        timeout: 50,
        proxy: '123.234.53.22',
        follow: false,
    });
});

test('parse archivo con extensión no soportada lanza error', () => {
    // Crear un archivo temporal con extensión no soportada
    const tempFile = path.resolve(__dirname, '__fixtures__/temp.txt');
    fs.writeFileSync(tempFile, 'content');
    try {
        expect(() => parse('./__tests__/__fixtures__/temp.txt')).toThrow('Unsupported file format: .txt');
    } finally {
        fs.unlinkSync(tempFile);
    }
});