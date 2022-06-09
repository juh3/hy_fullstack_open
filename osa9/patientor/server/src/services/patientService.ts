import patientData from '../data/patients.json';
import { v1 as uuid } from 'uuid';
import { Patient, SensitivePatientEntry, NewPatientEntry } from '../types';
const patients: Array<Patient> = patientData;

const getPatients = (): SensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, occupation, gender, entries }) => ({
    id,
    name,
    dateOfBirth,
    occupation,
    gender,
    entries
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

  const findById = (id: string): Patient | undefined => {
    const patient = patients.find( d => d.id === id);
    return patient;
  };

export default {
  getPatients,
  addPatient,
  findById
};