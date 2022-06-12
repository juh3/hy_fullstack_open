import { NewPatientEntry, Gender, NewEntry, EntryType, SpecificNewEntry, HospitalEntry, OccupationalHealthcareEntry } from "./types";

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, occupation: unknown, gender: unknown };


export const toNewPatientEntry = ({ name, dateOfBirth, ssn, occupation, gender }: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName( name),
    dateOfBirth: parseDate( dateOfBirth),
    ssn: parseName(ssn),
    occupation: parseName(occupation),
    gender: parseGender(gender),
  };

  return newEntry;
};

const parseName = ( name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseDate = (date: unknown): string => {
  if(!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};


const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(' Incorrect or missing gender');
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = ( param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseEntryType = (type: unknown): EntryType => {
  if(!type||!isType(type)) {
    throw new Error('Incorrect or missing entry type')
  }
  return type;
};

const isType = (param: any): param is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(param);
};

export const toEntry = (entry: any): SpecificNewEntry => {

  const newEntry: NewEntry = {
    description: parseName(entry.description),
    date: parseDate( entry.date),
    specialist: parseName(entry.specialist),
  };

  if(entry.diagnosisCodes) {
    if (Array.isArray(entry.diagnosisCodes)){
      const codes = entry.diagnosisCodes.map((c: unknown) => parseName(c))
      if (codes) {
        newEntry.diagnosisCodes = codes
      }
  }

  switch(entry.type){

    case "Hospital":
      const hospitalEntry: HospitalEntry = {
        type: parseEntryType(entry.type)
        discharge: 
        ...newEntry
      };
     
    
      case "OccupationalHealthcare":
        const occupationalEntry: OccupationalHealthcareEntry = {
          type: parseEntryType(entry.type),
          employerName: parseName(entry.employerName),
          sickLeave: 

        }

      case "HealthCheck":
        handleHealthCheck(entry)
      
    default: 
      return assertNever(entry);
    }
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};