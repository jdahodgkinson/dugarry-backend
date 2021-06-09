import express from 'express';
import * as fs from 'fs';
import { get3rdPlaceTable } from './group_stage_builder';

const app = express();
const PORT = process.env.PORT || 5000;

const callApi = async () => {
  try {
    const table = await get3rdPlaceTable();
    fs.writeFileSync('./3rdPlaceTable.json', JSON.stringify(table));
    console.log('Updated table from API.');
  }
  catch (err) {
    console.error(err);
  }
};

callApi();
setInterval(callApi, 12000);

app.get('/', (_, res) => {
  const path = './3rdPlaceTable.json';
  const buf = fs.readFileSync(path);
  const table = JSON.parse(buf.toString());
  res.send(table);
});

app.listen(PORT, () => {
  console.log(`dugarry listening on ${PORT}`); 
});
