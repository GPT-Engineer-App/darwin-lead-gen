import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.post('/save-icp', (req, res) => {
  const icpData = req.body;
  const filePath = path.join(__dirname, 'icpData.json');

  fs.writeFile(filePath, JSON.stringify(icpData, null, 2), (err) => {
    if (err) {
      console.error('Error saving ICP data:', err);
      return res.status(500).json({ error: 'Failed to save ICP data' });
    }
    res.status(200).json({ message: 'ICP data saved successfully' });
  });
});

export default router;