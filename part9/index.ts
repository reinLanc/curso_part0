import { Request, Response } from "express";
import { calculateBmi } from "./exercises/bmiCalculator";
import { calculateExercises, ExerciseResult } from "./exercises/exerciseCalculator";
const express = require('express');
const app = express();

app.use(express.json());

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
  const height = parseFloat(req.query.height as string);
  const weight = parseFloat(req.query.weight as string);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    return void res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmiResult = calculateBmi(height, weight);

  return void res.json({
    weight,
    height,
    bmi: bmiResult,
  });
});

app.post('/exercises', (req: { body: { daily_exercises: any; target: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): any; new(): any; }; }; json: (arg0: ExerciseResult) => any; }) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || target === undefined) {
      return res.status(400).json({ error: 'parameters missing' });
  }

  if (
      !Array.isArray(daily_exercises) ||
      !daily_exercises.every((num) => typeof num === 'number') ||
      typeof target !== 'number'
  ) {
      return res.status(400).json({ error: 'malformatted parameters' });
  }

  try {
      const result = calculateExercises(daily_exercises, target);
      return res.json(result);
  } catch (error) {
      return res.status(500).json({ error: 'Something went wrong' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});