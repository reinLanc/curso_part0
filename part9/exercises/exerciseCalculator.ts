export interface ExerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

export const calculateExercises = (dailyHours: number[], target: number): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(day => day > 0).length;
  const totalHours = dailyHours.reduce((a, b) => a + b, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'Excellent, target achieved!';
  } else if (average >= target * 0.5) {
    rating = 2;
    ratingDescription = 'Not too bad, but could be better';
  } else {
    rating = 1;
    ratingDescription = 'Poor performance, try harder';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

// const args = process.argv.slice(2);
// const targetArg = args[0];
// const dailyHoursArgs = args.slice(1);

// if (targetArg === '' || dailyHoursArgs.some(arg => arg === '' || isNaN(Number(arg)))) {
//   console.log('please introduce a valid value for target and hours.');
// } else {
//   const dailyHours = dailyHoursArgs.map(Number);
//   const target = Number(targetArg);
//   console.log(calculateExercises(dailyHours, target));
// }
