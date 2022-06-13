import patientData from '../data/patients';
import { v1 as uuid } from 'uuid';
import { Patient, NewPatientEntry, SensitivePatientEntry, SpecificNewEntry, Entry } from '../types';
const patients: Array<Patient> = patientData;

const getPatients = (): SensitivePatientEntry[] => {
  return patients.map(({ id, name, ssn, dateOfBirth, occupation, gender, entries }) => ({
    id,
    name,
    ssn,
    dateOfBirth,
    occupation,
    gender,
    entries
  }));
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
  
  const newPatientEntry = { id: uuid(), entries: [],
    ...entry
  };
  patients.push(newPatientEntry);

  return newPatientEntry;

};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find( d => d.id === id);
  return patient;
};

const addEntry = (entry: SpecificNewEntry, patient: Patient): Patient => {
  const newEntry: Entry = { id:uuid(), ...entry};
  patient.entries.push(newEntry);
  return patient;
}

export default {
  getPatients,
  addPatient,
  findById,
  addEntry
};