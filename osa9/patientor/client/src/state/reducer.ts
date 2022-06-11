import { State } from "./state";
import { Diagnose, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "SET_SINGLE_PATIENT";
    payload: Patient;
    }
  | {
    type: "SET_DIAGNOSE_LIST";
    payload: Diagnose[];
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    
    case "SET_SINGLE_PATIENT":
      return {
        ...state,
        patient: action.payload,
        };
        
    case "SET_DIAGNOSE_LIST":
      return {
        ...state,
        diagnoses:
          action.payload
        };

    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
  return{
    type: 'SET_PATIENT_LIST',
    payload: patients
  };
};

export const addPatientState = (patient: Patient): Action => {
  return{
    type: 'ADD_PATIENT',
    payload: patient
  };
};

export const setSinglePatient = (patient: Patient): Action=> {
  return{
    type: 'SET_SINGLE_PATIENT',
    payload: patient
  };
};

export const setDiagnoseList = (diagnoses: Diagnose[]): Action => {
  return{
    type: 'SET_DIAGNOSE_LIST',
    payload: diagnoses
  };
};