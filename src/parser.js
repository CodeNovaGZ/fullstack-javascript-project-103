import fs from 'fs';
import path from 'path';

export default function getData(file) {
    const filePath = path.resolve(process.cwd(), file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const parsedData = JSON.parse(fileContent);

    return parsedData;
}