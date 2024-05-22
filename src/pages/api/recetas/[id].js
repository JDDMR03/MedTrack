import db from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const query = `
        SELECT *
        FROM RECETAS
        WHERE ID_c = ?
      `;
      db.query(query, [id], (err, results) => {
        if (err) {
          console.error('Error fetching receta:', err);
          return res.status(500).json({ error: 'Error fetching receta' });
        }
        if (results.length === 0) {
          return res.status(404).json({ error: 'Receta not found' });
        }
        res.status(200).json(results[0]);
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching receta' });
    }
  } else if (req.method === 'POST' || req.method === 'PUT') {
    try {
      const { Instrucciones_r } = req.body;

      let query, params;
      if (req.method === 'POST') {
        query = `
          INSERT INTO RECETAS (ID_c, Instrucciones_r, Fecha_r)
          VALUES (?, ?, NOW())
        `;
        params = [id, Instrucciones_r];
      } else if (req.method === 'PUT') {
        query = `
          UPDATE RECETAS
          SET Instrucciones_r = ?
          WHERE ID_c = ?
        `;
        params = [Instrucciones_r, id];
      }

      db.query(query, params, (err, results) => {
        if (err) {
          console.error('Error saving receta:', err);
          return res.status(500).json({ error: 'Error saving receta' });
        }
        res.status(200).json({ message: 'Receta saved successfully' });
      });
    } catch (error) {
      res.status(500).json({ error: 'Error saving receta' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
