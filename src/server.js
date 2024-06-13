import express from 'express';
import bodyParser from 'body-parser';
import saveBuyerPersonaRouter from './api/save-buyer-persona';
import attachPersonaToCampaignRouter from './api/attach-persona-to-campaign';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', saveBuyerPersonaRouter);
app.use('/api', attachPersonaToCampaignRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});