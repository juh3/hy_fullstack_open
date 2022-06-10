import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import bodyParser from 'body-parser';



const app = express();
app.use(bodyParser.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Fullstack');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  console.log(height,weight);
  if( isNaN(Number(height)) && isNaN(Number(weight))) {
    res.status(400).send({ error: 'Malformatted parameters'});

  }else {
  

  const bmi =  calculateBmi(Number(height),Number(weight));
  res.status(200).send({
    weight,
    height,
    bmi
  });
  }
});


app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-assignment
  console.log(req);
  const { daily_exercises, target}: any = req.body;
  console.log(daily_exercises);
  console.log(target);
  if (!target || !daily_exercises) {
    return res.status(400).json({error: 'Missing Parameters'});
  }
  if ( isNaN(Number(target))) {
    return res.status(400).json({error: 'Malformatted Parameters'});
  }

  if(daily_exercises) {
    const isanarray: boolean = Array.isArray(daily_exercises);

    if (!isanarray) {
      return res.status(400).json({ error: 'Malformatted Parameters'});
    } else {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-assignment
  daily_exercises.forEach( (hour: number) => {
      if (isNaN(Number(hour))) {
        return res.status(400).json({ error: 'Malformatted Parameters'});
      }
    })

    // eslint-disable-next-line
    const result = calculateExercises(daily_exercises, Number(target));
    return res.status(200).json(
      result
    );}
  }else{
  return res.json({ error: 'Not given an array of exercises'});
  }
})


const PORT = '3000';

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});