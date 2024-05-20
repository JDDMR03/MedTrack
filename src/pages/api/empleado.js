import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      db.query('SELECT * FROM EMPLEADO', (err, results) => {
        if (err) {
          throw err;
        }
        res.status(200).json(results);
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching empleados' });
    }
  } else if (req.method === 'POST') {
    const { ID_e, Nom_e, Passw_e, puesto_e, fechanaci_e, CP_e, Tel_e, Dire_e, Mail_e, Turno_e } = req.body;

    const insertQuery = `
      INSERT INTO EMPLEADO (ID_e, Nom_e, Passw_e, puesto_e, fechanaci_e, CP_e, Tel_e, Dire_e, Mail_e, Turno_e)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [ID_e, Nom_e, Passw_e, puesto_e, fechanaci_e, CP_e, Tel_e, Dire_e, Mail_e, Turno_e];

    try {
      db.query(insertQuery, values, (err, result) => {
        if (err) {
          throw err;
        }
        const newEmpleado = {
          ID_e,
          Nom_e,
          Passw_e,
          puesto_e,
          fechanaci_e,
          CP_e,
          Tel_e,
          Dire_e,
          Mail_e,
          Turno_e,
        };
        res.status(201).json(newEmpleado);
      });
    } catch (error) {
      res.status(500).json({ error: 'Error creating empleado' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}