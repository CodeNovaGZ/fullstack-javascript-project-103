# gendiff

Herramienta de línea de comandos para comparar archivos de configuración y mostrar sus diferencias.

## Descripción

`gendiff` analiza archivos JSON, YAML y YML, construye un diff entre dos archivos y muestra el resultado en diferentes formatos.

## Características

- Compara estructuras anidadas
- Soporta archivos `.json`, `.yml` y `.yaml`
- Formatos de salida:
  - `stylish` (por defecto)
  - `plain`
  - `json`

## Instalación

```bash
npm install
```

## Uso

Comparar dos archivos con el formato por defecto:

```bash
node bin/gendiff.js <filepath1> <filepath2>
```

Ejemplo:

```bash
node bin/gendiff.js __tests__/__fixtures__/file1.json __tests__/__fixtures__/file2.json
```

Usar formato `plain`:

```bash
node bin/gendiff.js __tests__/__fixtures__/file1.json __tests__/__fixtures__/file2.json --format plain
```

Usar formato `json`:

```bash
node bin/gendiff.js __tests__/__fixtures__/file1.json __tests__/__fixtures__/file2.json --format json
```

## Scripts disponibles

```bash
npm test
npm run lint
```

## Estructura principal

- `bin/gendiff.js` - punto de entrada CLI
- `src/index.js` - función principal `genDiff`
- `src/treeBuilder.js` - construcción del árbol de diferencias
- `src/parser.js` - parseador de JSON/YAML
- `src/formatters/` - formateadores de salida
- `__tests__/` - pruebas unitarias

## Demostraciones

Los siguientes cuatro asciicast son demostraciones del paquete en funcionamiento:

- [Demo 1](https://asciinema.org/a/huT4UDAPhEf5fG6U)
- [Demo 2](https://asciinema.org/a/z6K9VADDyBhebNPE)
- [Demo 3](https://asciinema.org/a/nNALV9rKmwBSlXap)
- [Demo 4](https://asciinema.org/a/58cH3mBzHpQcA4hc)

## Notas

Esta herramienta facilita comparar versiones de archivos de configuración y revisar cambios de forma clara y legible.

[![Maintainability](https://qlty.sh/gh/CodeNovaGZ/projects/fullstack-javascript-project-103/maintainability.svg)](https://qlty.sh/gh/CodeNovaGZ/projects/fullstack-javascript-project-103)
[![Code Coverage](https://qlty.sh/gh/CodeNovaGZ/projects/fullstack-javascript-project-103/coverage.svg)](https://qlty.sh/gh/CodeNovaGZ/projects/fullstack-javascript-project-103)
[![Actions Status](https://github.com/CodeNovaGZ/fullstack-javascript-project-103/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/CodeNovaGZ/fullstack-javascript-project-103/actions)
[![Actions Status](https://github.com/CodeNovaGZ/fullstack-javascript-project-103/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/CodeNovaGZ/fullstack-javascript-project-103/actions)