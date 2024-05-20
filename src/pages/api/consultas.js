import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      db.query('SELECT * FROM CONSULTAS', (err, results) => {
        if (err) {
          throw err;
        }
        res.status(200).json(results);
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching consultas' });
    }
  } else if (req.method === 'POST') {
    const { ID_c, ID_m, ID_p, Fecha_c, Motivo_c, Explo_fis_c, Diagnos_c, Trata_c, Pronos_c, terminada_ci } = req.body;

    const insertQuery = `
      INSERT INTO CONSULTAS (ID_c, ID_m, ID_p, Fecha_c, Motivo_c, Explo_fis_c, Diagnos_c, Trata_c, Pronos_c, terminada_ci)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [ID_c, ID_m, ID_p, Fecha_c, Motivo_c, Explo_fis_c, Diagnos_c, Trata_c, Pronos_c, terminada_ci];

    try {
      db.query(insertQuery, values, (err, result) => {
        if (err) {
          throw err;
        }
        const newConsulta = {
          ID_c,
          ID_m,
          ID_p,
          Fecha_c,
          Motivo_c,
          Explo_fis_c,
          Diagnos_c,
          Trata_c,
          Pronos_c,
          terminada_ci,
        };
        res.status(201).json(newConsulta);
      });
    } catch (error) {
      res.status(500).json({ error: 'Error creating consulta' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}