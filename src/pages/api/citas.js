import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const query = `
        SELECT *
        FROM CITAS c 
        JOIN PACIENTE p ON c.ID_p = p.ID_p 
        ORDER BY c.Hora_ci ASC
      `;
      db.query(query, (err, results) => {
        if (err) {
          console.error('Error fetching citas:', err);
          return res.status(500).json({ error: 'Error fetching citas' });
        }
        res.status(200).json(results);
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching citas' });
    }
  } else if (req.method === 'POST') {
    try {
      const {ID_e, fecha_ci, Hora_ci, ID_p } = req.body;

      const query = `
        INSERT INTO CITAS (ID_e, Hora_ci, fecha_ci, ID_p, terminada_ci)
        VALUES (?, ?, ?, ?, false)
      `;
      db.query(
        query,
        [ ID_e, Hora_ci, fecha_ci, ID_p ],
        (err, result) => {
          if (err) {
            console.error('Error adding appointment:', err);
            return res.status(500).json({ error: 'Error adding appointment' });
          }
          res.status(200).json({ message: 'Appointment added successfully', id: result.insertId });
        }
      );
    } catch (error) {
      console.error('Unexpected error adding appointment:', error);
      res.status(500).json({ error: 'Unexpected error adding appointment' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
