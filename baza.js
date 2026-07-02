import Database from 'better-sqlite3';

const db = new Database('baza.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS obliczenia (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        a REAL,
        b REAL,
        operacja TEXT,
        wynik REAL
    )
`);

export default db;