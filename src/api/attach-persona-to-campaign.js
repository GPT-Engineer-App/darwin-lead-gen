import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.post('/attach-persona-to-campaign', (req, res) => {
  const { campaignId, personaId } = req.body;
  const campaignsFilePath = path.join(__dirname, 'campaigns.json');
  const personasFilePath = path.join(__dirname, 'buyerPersonas.json');

  fs.readFile(campaignsFilePath, 'utf8', (err, campaignsData) => {
    if (err) {
      console.error('Error reading campaigns file:', err);
      return res.status(500).json({ error: 'Failed to read campaigns file' });
    }

    fs.readFile(personasFilePath, 'utf8', (err, personasData) => {
      if (err) {
        console.error('Error reading buyer personas file:', err);
        return res.status(500).json({ error: 'Failed to read buyer personas file' });
      }

      const campaigns = JSON.parse(campaignsData);
      const personas = JSON.parse(personasData);

      const campaign = campaigns.find(c => c.id === campaignId);
      const persona = personas.find(p => p.id === personaId);

      if (!campaign) {
        return res.status(404).json({ error: 'Campaign not found' });
      }

      if (!persona) {
        return res.status(404).json({ error: 'Buyer persona not found' });
      }

      campaign.personas = campaign.personas || [];
      campaign.personas.push(persona);

      fs.writeFile(campaignsFilePath, JSON.stringify(campaigns, null, 2), (err) => {
        if (err) {
          console.error('Error saving campaign:', err);
          return res.status(500).json({ error: 'Failed to save campaign' });
        }
        res.status(200).json({ message: 'Buyer persona attached to campaign successfully' });
      });
    });
  });
});

export default router;