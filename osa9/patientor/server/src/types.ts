// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export enum EntryType{
  "Hospital" = "Hospital",
  "OccupationalHealthcare" = "OccupationalHealthcare",
  "HealthCheck" = "HealthCheck",
}

export interface Diagnose{
  code: string;
  name: string;
  latin?: string;
}
export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: { startDate: string, endDate: string};
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: { date: string, criteria: string} ;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
};

export type PublicPatient = Omit<Patient, 'ssn' >;

export type SensitivePatientEntry = Omit< Patient, "ssn">;

export type NewPatientEntry = Omit< Patient, "id" | 'entries'>;
export type NewEntry = Omit<BaseEntry, "id">
export type SpecificNewEntry = |Omit<HealthCheckEntry, "id"> | Omit<HospitalEntry, "id"> | Omit<OccupationalHealthcareEntry, "id">;
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}