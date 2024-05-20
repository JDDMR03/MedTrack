import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { Mail_m, Passw_m } = req.body;

    if (!Mail_m || !Passw_m) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const query = 'SELECT * FROM MEDICO WHERE Mail_m = ? AND Passw_m = ?';
    const values = [Mail_m, Passw_m];

    try {
      db.query(query, values, (err, results) => {
        if (err) {
          throw err;
        }
        if (results.length > 0) {
          res.status(200).json({ success: true, medico: results[0] });
        } else {
          res.status(401).json({ error: 'Invalid email or password' });
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Error logging in' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
