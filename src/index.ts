import express from 'express';

const app = express();
const port = 3000;

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
