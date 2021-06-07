import express from 'express';

const app = express();
const port = 3000;

app.get('/', (_, res) => {
  res.send(
    {
      'name': 'Football',
      'comingHome': true
    }
  );
});

app.listen(port, () => {
  console.log(`Dugarrry listening at http://localhost:${port}`); 
});
