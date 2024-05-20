import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      db.query('SELECT * FROM PACIENTE', (err, results) => {
        if (err) {
          throw err;
        }
        res.status(200).json(results);
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching pacientes' });
    }
  } else if (req.method === 'POST') {
    const { ID_p, Nom_p, mail_p, direc_p, fechanaci_p, IDoficial_p, tel_p, Ante_no_pat_p, Ante_here_p, Ante_pat_p } = req.body;

    const insertQuery = `
      INSERT INTO PACIENTE (ID_p, Nom_p, mail_p, direc_p, fechanaci_p, IDoficial_p, tel_p, Ante_no_pat_p, Ante_here_p, Ante_pat_p)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [ID_p, Nom_p, mail_p, direc_p, fechanaci_p, IDoficial_p, tel_p, Ante_no_pat_p, Ante_here_p, Ante_pat_p];

    try {
      db.query(insertQuery, values, (err, result) => {
        if (err) {
          throw err;
        }
        const newPaciente = {
          ID_p,
          Nom_p,
          mail_p,
          direc_p,
          fechanaci_p,
          IDoficial_p,
          tel_p,
          Ante_no_pat_p,
          Ante_here_p,
          Ante_pat_p,
        };
        res.status(201).json(newPaciente);
      });
    } catch (error) {
      res.status(500).json({ error: 'Error creating paciente' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}