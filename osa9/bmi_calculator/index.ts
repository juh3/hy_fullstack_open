import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Fullstack')
})

app.get('/bmi', async (req, res) => {
  let { height, weight } = req.query
  console.log(height,weight)
  if( isNaN(Number(height)) && isNaN(Number(weight))) {
    res.status(400).send({ error: 'Malformatted parameters'})

  }else {
  

  const bmi =  calculateBmi(Number(height),Number(weight));
  res.status(200).send({
    weight,
    height,
    bmi
  })
  }
})

const PORT = '3000';

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
})