const csv = require('csv-parser')
const fs = require('fs')
const results = [];

const FILE_EXSTENSION = '﻿File Extension';
const DISPLAY_NAME = 'Display Name';

let KEYS = '';
let EXTENSIONS = 'export const exts = [\n';
let STRINGS = '{\n';

fs.createReadStream('cat2.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    results.forEach((item) => {
      const name = item[DISPLAY_NAME].match(/^\d/) ? item[DISPLAY_NAME].slice(1) : item[DISPLAY_NAME];
      const key = name.toUpperCase()
        .replace(/[\s-]/g, '_')
        .replace(/[()'"]/g, '');

      KEYS += `export const ${key} = "${key}";\n`;

      const exts = item[FILE_EXSTENSION].toLowerCase().split(', ').map((e) => `".${e}"`);
      EXTENSIONS += `{ key: ${key}, exts: [${exts.join(', ')}] },\n`;

      STRINGS += `"${key}": "${item[DISPLAY_NAME]}",\n`;
    });

    EXTENSIONS += ']';
    STRINGS += '}';

    fs.writeFile('const.js', `${KEYS}\n\n\n${EXTENSIONS}`, function (err) {
      if (err) throw err;
      console.log('File const.js is created successfully.');
    });

    fs.writeFile('strings.json', STRINGS, function (err) {
      if (err) throw err;
      console.log('File strings is created successfully.');
    });
  });
