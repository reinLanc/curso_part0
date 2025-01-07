import { Request, Response } from "express";
import { calculateBmi } from "./excercises/bmiCalculator";
const express = require('express');
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});