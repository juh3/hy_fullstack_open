import patientData from '../data/patients.json';
import { v1 as uuid } from 'uuid';
import { Patient, SensitivePatientEntry, NewPatientEntry } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): SensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, occupation, gender  }) => ({
    id,
    name,
    dateOfBirth,
    occupation,
    gender
  }));
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const id = uuid();

  const newPatientEntry = { id: id,
    ...entry
  };
  patients.push(newPatientEntry);

  return newPatientEntry;

  };


export default {
  getPatients,
  addPatient
};