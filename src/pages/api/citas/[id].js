import db from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const query = `
        SELECT c.ID_ci, c.Hora_ci, c.terminada_ci, c.fecha_ci, p.ID_p, p.Nom_p as patient_name, e.Nom_e as doctor_name
        FROM CITAS c 
        JOIN PACIENTE p ON c.ID_p = p.ID_p 
        JOIN EMPLEADO e ON c.ID_e = e.ID_e 
        WHERE c.ID_ci = ?
      `;
      db.query(query, [id], (err, results) => {
        if (err) {
          console.error('Error fetching cita:', err);
          return res.status(500).json({ error: 'Error fetching cita' });
        }
        if (results.length === 0) {
          return res.status(404).json({ error: 'Cita not found' });
        }
        res.status(200).json(results[0]);
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching cita' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { terminada_ci } = req.body;
      const query = `
        UPDATE CITAS
        SET terminada_ci = ?
        WHERE ID_ci = ?
      `;
      db.query(query, [terminada_ci, id], (err, results) => {
        if (err) {
          console.error('Error updating cita:', err);
          return res.status(500).json({ error: 'Error updating cita' });
        }
        res.status(200).json({ message: 'Cita updated successfully' });
      });
    } catch (error) {
      res.status(500).json({ error: 'Error updating cita' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
