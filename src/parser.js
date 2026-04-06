import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default function getData(file) {
  const filePath = path.resolve(process.cwd(), file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const extension = path.extname(filePath).toLowerCase();

  if (extension === '.json') {
    return JSON.parse(fileContent);
  }
  if (extension === '.yml' || extension === '.yaml') {
    return yaml.load(fileContent);
  }

  throw new Error(`Unsupported file format: ${extension}`);
}
