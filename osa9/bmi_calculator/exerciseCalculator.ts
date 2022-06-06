
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}


const parseArgument= (args: Array <string>) => {
  if( args.length < 4) throw new Error('Not enough arguments');
  
  if( !isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return{
      array: args.slice(3).map( e => Number(e)),
      target: Number(args[2])

    };
  }else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateExercises= ( array: Array<number>, target: number) : Result => {
  console.log(array);
  const periodLength: number = array.length;
  let trainingDays: number = 0;
  const starter: number = 0;
  array.reduce( (previousValue: number, currentValue: number) => {
    if(currentValue !== 0) {
      trainingDays += 1;
    }
    return previousValue;

  
  }, starter);
  let success = true;
  if( target > trainingDays) {
    success = false;
  }

  let hours = 0;
  array.reduce( (previousValue: number, currentValue: number) => {
    hours += currentValue;
    return previousValue;
  }, 0);

  let rating = 0;
  let ratingDescription = '';
  if (hours < 10) {
    rating = 1;
    ratingDescription = 'Better grind next week';
  } if( hours >15) {
    rating = 3;
    ratingDescription = 'very good!!!';
  } if (hours >10 && hours <15) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }
  const average = hours/periodLength;

  return({
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  }
  );
};

try{
  const { array, target } = parseArgument(process.argv);
  calculateExercises(array, target);
} catch(  error: unknown) {
  let errormessage = 'Something bad happened';
  if (error instanceof Error) {
    errormessage += 'Error: ' + errormessage;
  }
  console.log(errormessage);
}