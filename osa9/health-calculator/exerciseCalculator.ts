interface ExerciseData {
  target: number;
  data: number[];
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]): ExerciseData => {
  if (args.length < 4) throw new Error('missing arguments');

  const exerciseData: number[] = args.slice(3).map(Number);

  if (!isNaN(Number(args[2])) && !exerciseData.some(isNaN)) {
    return {
      target: Number(args[2]),
      data: [...exerciseData],
    };
  } else {
    throw new Error('some of the provided values were not numbers!');
  }
};

const exerciseCalculator = (target: number, exerciseData: number[]): Result => {
  const trainingDays: number[] = exerciseData.filter((d: number) => d > 0);
  const average: number =
    exerciseData.reduce((a, b) => a + b) / exerciseData.length;

  let rating: number;
  let ratingDescription: string;
  if (average < 1) {
    rating = 1;
    ratingDescription = 'poor';
  } else if (average > 1 && average < 2) {
    rating = 2;
    ratingDescription = 'good';
  } else {
    rating = 3;
    ratingDescription = 'excellent';
  }

  const returnObject = {
    periodLength: exerciseData.length,
    trainingDays: trainingDays.length,
    success: average >= target ? true : false,
    rating,
    ratingDescription,
    target,
    average,
  };

  return returnObject;
};

try {
  const { target, data } = parseArguments(process.argv);
  console.log(exerciseCalculator(target, data));
} catch (e) {
  console.log('Error:', e.message);
}

export {};
