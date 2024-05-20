import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      db.query('SELECT * FROM RECETAS', (err, results) => {
        if (err) {
          throw err;
        }
        res.status(200).json(results);
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching recetas' });
    }
  } else if (req.method === 'POST') {
    const { ID_r, ID_c, Instrucciones_r, Fecha_r } = req.body;

    const insertQuery = `
      INSERT INTO RECETAS (ID_r, ID_c, Instrucciones_r, Fecha_r)
      VALUES (?, ?, ?, ?)
    `;

    const values = [ID_r, ID_c, Instrucciones_r, Fecha_r];

    try {
      db.query(insertQuery, values, (err, result) => {
        if (err) {
          throw err;
        }
        const newReceta = {
          ID_r,
          ID_c,
          Instrucciones_r,
          Fecha_r,
        };
        res.status(201).json(newReceta);
      });
    } catch (error) {
      res.status500().json({ error: 'Error creating receta' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}