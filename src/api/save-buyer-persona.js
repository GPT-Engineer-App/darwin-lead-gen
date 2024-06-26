import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.post('/save-buyer-persona', (req, res) => {
  const buyerPersona = req.body;
  const filePath = path.join(__dirname, 'buyerPersonas.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      console.error('Error reading buyer personas file:', err);
      return res.status(500).json({ error: 'Failed to read buyer personas file' });
    }

    const buyerPersonas = data ? JSON.parse(data) : [];
    buyerPersonas.push(buyerPersona);

    fs.writeFile(filePath, JSON.stringify(buyerPersonas, null, 2), (err) => {
      if (err) {
        console.error('Error saving buyer persona:', err);
        return res.status(500).json({ error: 'Failed to save buyer persona' });
      }
      res.status(200).json({ message: 'Buyer persona saved successfully' });
    });
  });
});

export default router;