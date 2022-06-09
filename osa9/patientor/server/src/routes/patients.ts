import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry } from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.findById(id);
  if(!patient){
    res.sendStatus(404);
  } else{
    res.send(patient);
  }
});

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
router.post('/', (req, res) => {
  try{
    const 
    newPatientEntry = toNewPatientEntry(req.body);

    const addedPatient = patientService.addPatient(newPatientEntry );
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;