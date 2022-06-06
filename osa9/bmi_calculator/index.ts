import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';



const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
import { Request, Response } from "express";


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


app.post('/exercises', ({ body }: Request ,res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-assignment
  const daily_exercises = body.daily_exercises;
  const target = body.target;
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
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    daily_exercises.reduce( (previousValue: number, currentValue: number) => {
      if(isNaN(Number(currentValue))) {
        return res.status(400).json({ error: 'Malformatted Parameters'});
      }
      return previousValue;

    }, 0);
  }
   // eslint-disable-next-line
  const result = calculateExercises(daily_exercises, Number(target));
  return res.status(200).json(
    result
  );
});

// eslint-disable-next-line
const unknownEndpoint = (_request: any, response: any) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = '3000';

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});