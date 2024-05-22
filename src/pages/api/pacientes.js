// /api/pacientes.js

import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { name, id } = req.query;

      let query;
      let params;

      if (name) {
        query = `
          SELECT *
          FROM PACIENTE
          WHERE Nom_p LIKE ?
        `;
        params = [`%${name}%`];
      } else if (id) {
        query = `
          SELECT *
          FROM PACIENTE
          WHERE ID_p = ?
        `;
        params = [id];
      } else {
        return res.status(400).json({ error: 'Either name or ID parameter is required' });
      }

      db.query(query, params, (err, result) => {
        if (err) {
          console.error('Error retrieving paciente:', err);
          return res.status(500).json({ error: 'Error retrieving paciente' });
        }
        res.status(200).json(result);
      });
    } catch (error) {
      console.error('Unexpected error retrieving paciente:', error);
      res.status(500).json({ error: 'Unexpected error retrieving paciente' });
    }
  } else if (req.method === 'POST') {
    try {
      const {
        Nom_p,
        mail_p,
        direc_p,
        fechanaci_p,
        IDoficial_p,
        tel_p,
        Ante_no_pat_p,
        Ante_here_p,
        Ante_pat_p
      } = req.body;

      const query = `
        INSERT INTO PACIENTE (Nom_p, mail_p, direc_p, fechanaci_p, IDoficial_p, tel_p, Ante_no_pat_p, Ante_here_p, Ante_pat_p)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        Nom_p,
        mail_p,
        direc_p,
        fechanaci_p,
        IDoficial_p,
        tel_p,
        Ante_no_pat_p,
        Ante_here_p,
        Ante_pat_p
      ];

      db.query(query, values, (err, result) => {
        if (err) {
          console.error('Error adding paciente:', err);
          return res.status(500).json({ error: 'Error adding paciente' });
        }
        res.status(200).json({ message: 'Paciente added successfully', id: result.insertId });
      });
    } catch (error) {
      console.error('Unexpected error adding paciente:', error);
      res.status(500).json({ error: 'Unexpected error adding paciente' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
