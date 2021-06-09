import express from 'express';
import { get3rdPlaceTable } from './group_stage_builder';

const app = express();
const port = 3000;

app.get('/', async (_, res) => {
  const table = await get3rdPlaceTable();
  res.send(table);
});

app.listen(port, () => {
  console.log(`dugarry listening at http://localhost:${port}`); 
});
