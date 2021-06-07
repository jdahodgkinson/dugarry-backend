import express from 'express';
import { getGroup } from './group_stage_builder';

const app = express();
const port = 3000;

console.log(getGroup(225403));

app.get('/', (_, res) => {
  res.send(
    {
      'name': 'football',
      'comingHome': true
    }
  );
});

app.listen(port, () => {
  console.log(`dugarry listening at http://localhost:${port}`); 
});
