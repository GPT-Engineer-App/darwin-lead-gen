import express from 'express';
import { generatePersona } from './personaGenerator';

const router = express.Router();

router.post('/generate-buyer-persona', (req, res) => {
  const icpData = req.body;

  if (!icpData) {
    console.error('ICP data is missing in the request body');
    return res.status(400).json({ error: 'ICP data is required' });
  }

  try {
    const buyerPersona = generatePersona(icpData);
    res.status(200).json(buyerPersona);
  } catch (error) {
    console.error('Error generating buyer persona:', error.message);
    res.status(500).json({ error: 'Failed to generate buyer persona' });
  }
});

export default router;