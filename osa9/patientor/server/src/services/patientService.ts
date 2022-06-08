import patientData from '../data/patients.json';

import { Patient, SensitivePatientEntry } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): SensitivePatientEntry[] => {
  console.log('trying to get patients, in patient service')
  return patients.map(({ id, name, dateOfBirth, occupation, gender  }) => ({
    id,
    name,
    dateOfBirth,
    occupation,
    gender
  }));
}

export default {
  getPatients,
}