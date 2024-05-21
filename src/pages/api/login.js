import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
      // Check in MEDICO table
      let query = 'SELECT * FROM MEDICO WHERE Mail_m = ? AND Passw_m = ?';
      let values = [email, password];
      db.query(query, values, (err, medicoResults) => {
        if (err) throw err;
        if (medicoResults.length > 0) {
          return res.status(200).json({ success: true, user: medicoResults[0], userType: 'medico' });
        }

        // If not found in MEDICO, check in EMPLEADO table
        query = 'SELECT * FROM EMPLEADO WHERE Mail_e = ? AND Passw_e = ?';
        db.query(query, values, (err, empleadoResults) => {
          if (err) throw err;
          if (empleadoResults.length > 0) {
            return res.status(200).json({ success: true, user: empleadoResults[0], userType: 'empleado' });
          }

          // If not found in either table, return error
          res.status(401).json({ error: 'Invalid email or password' });
        });
      });
    } catch (error) {
      res.status(500).json({ error: 'Error logging in' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
