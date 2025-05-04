import { db } from './connection';

// Crear tabla de categorías
db.run(`
  CREATE TABLE IF NOT EXISTS categoria (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL UNIQUE
  )
`);

// Crear tabla de productos
db.run(`
  CREATE TABLE IF NOT EXISTS producto (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio_unitario REAL NOT NULL,
    categoria_id INTEGER NOT NULL,
    FOREIGN KEY(categoria_id) REFERENCES categoria(id)
  )
`);

export const initDB = () => {
  console.log('Tablas de SQLite inicializadas si no existían.');
};

// Tabla pedido
db.run(`
    CREATE TABLE IF NOT EXISTS pedido (
      id TEXT PRIMARY KEY,
      usuario_nombre TEXT,
      usuario_email TEXT,
      fecha TEXT,
      total_neto REAL,
      total_iva REAL,
      total_bruto REAL
    )
  `);
  
  // Tabla linea_pedido
  db.run(`
    CREATE TABLE IF NOT EXISTS linea_pedido (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pedido_id TEXT,
      producto_id INTEGER,
      cantidad INTEGER,
      sub_total REAL,
      FOREIGN KEY(pedido_id) REFERENCES pedido(id),
      FOREIGN KEY(producto_id) REFERENCES producto(id)
    )
  `);

 // 2. Sembrar categorías si la tabla está vacía
 db.get(`SELECT COUNT(*) AS count FROM categoria`, (err, row: any) => {
    if (err) return console.error(err);
    if (row.count === 0) {
      const cats = ['tornillos', 'clavos', 'caños', 'destornilladores'];
      const stmt = db.prepare(`INSERT INTO categoria (nombre) VALUES (?)`);
      cats.forEach(c => stmt.run(c));
      stmt.finalize();
      console.log('Seeding categorías:', cats);
    }
  });

  // 3. Sembrar productos si la tabla está vacía
  db.get(`SELECT COUNT(*) AS count FROM producto`, (err, row: any) => {
    if (err) return console.error(err);
    if (row.count === 0) {
      // Asumimos que las categorías ya tienen IDs del 1 al 4
      const productos = [
        { nombre: 'Tornillo 5cm', precio: 0.10, catId: 1 },
        { nombre: 'Clavo 3cm',   precio: 0.05, catId: 2 },
        { nombre: 'Caño PVC 1m', precio: 2.50, catId: 3 },
        { nombre: 'Destornillador Phillips', precio: 3.00, catId: 4 },
      ];
      const stmt2 = db.prepare(
        `INSERT INTO producto (nombre, precio_unitario, categoria_id) VALUES (?, ?, ?)`
      );
      productos.forEach(p =>
        stmt2.run(p.nombre, p.precio, p.catId)
      );
      stmt2.finalize();
      console.log('Seeding productos:', productos);
    }
  });

  console.log('Tablas inicializadas y datos de prueba sembrados si era necesario.');