import { NewPatientEntry, Gender } from "./types";

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, occupation: unknown, gender: unknown, entries: unknown };


export const toNewPatientEntry = ({ name, dateOfBirth, ssn, occupation, gender, entries }: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName( name),
    dateOfBirth: parseDate( dateOfBirth),
    ssn: parseName(ssn),
    occupation: parseName(occupation),
    gender: parseGender(gender),
    entries: parseEntry(entries)
  };

  return newEntry;
};

const parseEntry = (entries: unknown):Array<string> => {
  if(!entries || !Array.isArray(entries)) {
    throw new Error('Incorrect or missing entry');
  }
  return entries;
}

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