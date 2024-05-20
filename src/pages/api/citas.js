import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      db.query('SELECT * FROM CITAS', (err, results) => {
        if (err) {
          throw err;
        }
        res.status(200).json(results);
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching citas' });
    }
  } else if (req.method === 'POST') {
    const { ID_ci, ID_e, Hora_ci, ID_p, terminada_ci } = req.body;

    const insertQuery = `
      INSERT INTO CITAS (ID_ci, ID_e, Hora_ci, ID_p, terminada_ci)
      VALUES (?, ?, ?, ?, ?)
    `;

    const values = [ID_ci, ID_e, Hora_ci, ID_p, terminada_ci];

    try {
      db.query(insertQuery, values, (err, result) => {
        if (err) {
          throw err;
        }
        const newCita = {
          ID_ci,
          ID_e,
          Hora_ci,
          ID_p,
          terminada_ci,
        };
        res.status(201).json(newCita);
      });
    } catch (error) {
      res.status(500).json({ error: 'Error creating cita' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}