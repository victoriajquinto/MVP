/* execute this script with shell command: node --experimental-modules popularity.js */

import { db, pgp } from './db.mjs';

import fs from 'fs';

// Assuming the txt files are in the same directory as this script
const dataFolderPath = './data';

async function importData() {
  try {
    const files = fs.readdirSync(dataFolderPath);
    const insertQueries = [];

    files.forEach((file) => {
      console.log('filename: ', file);
      if (file.startsWith('yob') && file.endsWith('.txt')) {
        const year = parseInt(file.slice(3, 7));
        const content = fs.readFileSync(dataFolderPath + file, 'utf-8');
        const lines = content.split('\n');

        lines.forEach((line) => {
          if (line.trim().length > 0) {
            const [name, gender, count] = line.split(',');
            insertQueries.push(db.none('INSERT INTO popularity(name, gender, year, count) VALUES($1, $2, $3, $4)', [name, gender, year, parseInt(count)]));
          }
        });
      }
    });

    await Promise.all(insertQueries);
    console.log('Data import successful!');
  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    pgp.end();
  }
}

importData();