import express from 'express';
import bodyParser from 'body-parser';
import saveIcpRouter from './api/save-icp';
import generateBuyerPersonaRouter from './api/generate-buyer-persona';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', saveIcpRouter);
app.use('/api', generateBuyerPersonaRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});