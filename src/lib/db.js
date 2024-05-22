// lib/db.js

import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '200723',
  database: 'medtrack',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

export default db;
