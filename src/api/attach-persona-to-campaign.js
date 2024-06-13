import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.post('/attach-persona-to-campaign', (req, res) => {
  const { campaignId, buyerPersona } = req.body;
  const filePath = path.join(__dirname, 'data', 'campaigns.json'); // Ensure correct file path

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      console.error('Error reading campaigns file:', err);
      return res.status(500).json({ error: 'Failed to read campaigns file' });
    }

    let campaigns = [];
    if (data) {
      try {
        campaigns = JSON.parse(data);
      } catch (parseErr) {
        console.error('Error parsing campaigns file:', parseErr);
        return res.status(500).json({ error: 'Failed to parse campaigns file' });
      }
    }

    const campaign = campaigns.find(c => c.id === campaignId);

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    campaign.buyerPersona = buyerPersona;

    fs.writeFile(filePath, JSON.stringify(campaigns, null, 2), (err) => {
      if (err) {
        console.error('Error attaching buyer persona to campaign:', err);
        return res.status(500).json({ error: 'Failed to attach buyer persona to campaign' });
      }
      res.status(200).json({ message: 'Buyer persona attached to campaign successfully' });
    });
  });
});

export default router;