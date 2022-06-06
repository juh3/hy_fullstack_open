interface Measurements {
  length: number;
  weight: number;
};

const parseArguments= (args: Array <string>): Measurements => {
  if( args.length < 4) throw new Error('Not enough arguments');
  if(args.length>4) throw new Error('Too many arguments');

  if( !isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return{
      length: Number(args[2]),
      weight: Number(args[3])

    }
  }else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (length: number, weight: number) => {
  const length_in_m = length*10**(-2);
  const bmi = weight/(length_in_m*length_in_m);
  if (bmi >= 25){
    console.log('Overweight');
  }

  if (bmi< 16) {
    console.log('Underweight');
  }else{
    console.log('Normal (healthy weight)');

  }
}

try{
  const { length, weight } = parseArguments(process.argv);
  calculateBmi(length, weight);
} catch(error: unknown) {
  let errormessage = 'Something bad happened';
  if (error instanceof Error) {
    errormessage += 'Error: ' + errormessage;
  }
  console.log(errormessage)
}
