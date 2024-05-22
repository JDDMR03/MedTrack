import db from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const query = `
        SELECT *
        FROM CONSULTAS
        WHERE ID_ci = ?
      `;
      db.query(query, [id], (err, results) => {
        if (err) {
          console.error('Error fetching consulta:', err);
          return res.status(500).json({ error: 'Error fetching consulta' });
        }
        if (results.length === 0) {
          return res.status(404).json({ error: 'Consulta not found' });
        }
        res.status(200).json(results[0]);
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching consulta' });
    }
  } else if (req.method === 'POST' || req.method === 'PUT') {
    try {
      const {
        Motivo_c,
        Explo_fis_c,
        Diagnos_c,
        Trata_c,
        Pronos_c,
        terminada_c
      } = req.body;

      let query, params;
      if (req.method === 'POST') {
        query = `
          INSERT INTO CONSULTAS (ID_m, ID_p, ID_ci, Fecha_c, Motivo_c, Explo_fis_c, Diagnos_c, Trata_c, Pronos_c, terminada_c)
          VALUES (?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?)
        `;
        params = [1, 1, id, Motivo_c, Explo_fis_c, Diagnos_c, Trata_c, Pronos_c, terminada_c];
      } else if (req.method === 'PUT') {
        query = `
          UPDATE CONSULTAS
          SET Motivo_c = ?, Explo_fis_c = ?, Diagnos_c = ?, Trata_c = ?, Pronos_c = ?, terminada_c = ?
          WHERE ID_ci = ?
        `;
        params = [Motivo_c, Explo_fis_c, Diagnos_c, Trata_c, Pronos_c, terminada_c, id];
      }

      db.query(query, params, (err, results) => {
        if (err) {
          console.error('Error saving consulta:', err);
          return res.status(500).json({ error: 'Error saving consulta' });
        }
        res.status(200).json({ message: 'Consulta saved successfully' });
      });
    } catch (error) {
      res.status(500).json({ error: 'Error saving consulta' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
