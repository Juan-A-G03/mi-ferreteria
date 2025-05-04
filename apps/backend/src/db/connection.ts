import { Database } from 'sqlite3';
import path from 'path';
import fs from 'fs';

const dataDir = path.resolve(__dirname, '../../data');
const dbPath = path.join(dataDir, 'ferreteria.db');

// Asegurarte de que la carpeta exista
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export const db = new Database(dbPath, (err) => {
  if (err) {
    console.error('Error abriendo BD:', err);
  } else {
    console.log('Conectado a SQLite en', dbPath);
  }
});
