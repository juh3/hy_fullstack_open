import { NewPatientEntry, Gender, NewEntry, EntryType, SpecificNewEntry, HospitalEntry, OccupationalHealthcareEntry, DischargeType, SickLeaveType, HealthCheckEntry, HealthCheckRating } from "./types";

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

const isDischarge = (param:any): boolean => {
  if( param.date && param.criteria && isDate(param.date) && isString(param.criteria)) {
    return param;
  }
  else return false;
}

const parseDischarge = (discharge: unknown): DischargeType => {
  if(!discharge ||!isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge')
  }
  return discharge as DischargeType;
};


const isSickLeave = (param:any): boolean => {
  if(param.startDate && param.endDate && isDate(param.startDate) && isDate(param.endDate)) {
    return param;
  }
  else return false;
}
const parseSickLeave = (sickLeave: unknown): SickLeaveType => {
  if(!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sickleave')
  }
  return sickLeave as SickLeaveType;
}

const isHealthCheckRating = (param:any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
}

const parseHealthCheckRating  = (healthCheckRating: unknown): HealthCheckRating => {
  if(!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthcheckrating')
  }
  return healthCheckRating;
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
  }

  switch(entry.type){

    case "Hospital":
      const hospitalEntry: HospitalEntry = {
        type: parseEntryType(entry.type),
        discharge: parseDischarge(entry.discharge),
        ...newEntry
      };
      return hospitalEntry;
     
    
      case "OccupationalHealthcare":
        const occupationalEntry: OccupationalHealthcareEntry = {
          type: parseEntryType(entry.type),
          employerName: parseName(entry.employerName),
          sickLeave: parseSickLeave(entry.sickLeave),
          ...newEntry
        };
        return occupationalEntry;

      case "HealthCheck":
        const healthcheckEntry: HealthCheckEntry = {
          type: parseEntryType(entry.type),
          healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
          ...newEntry
        };
        return healthcheckEntry;
      
    default: 
      return assertNever(newEntry);
    }
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};