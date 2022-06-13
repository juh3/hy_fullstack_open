"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toEntry = exports.toNewPatientEntry = void 0;
const types_1 = require("./types");
const toNewPatientEntry = ({ name, dateOfBirth, ssn, occupation, gender }) => {
    const newEntry = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseName(ssn),
        occupation: parseName(occupation),
        gender: parseGender(gender),
    };
    return newEntry;
};
exports.toNewPatientEntry = toNewPatientEntry;
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error(' Incorrect or missing gender');
    }
    return gender;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(param);
};
/*onst parseEntryType = (type: unknown): EntryType => {
  if(!type||!isType(type)) {
    throw new Error('Incorrect or missing entry type')
  }
  return type;
};

const isType = (param: any): param is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(param);
};*/
const isDischarge = (param) => {
    if (param.date && param.criteria && isDate(param.date) && isString(param.criteria)) {
        return param;
    }
    else
        return false;
};
const parseDischarge = (discharge) => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error('Incorrect or missing discharge');
    }
    return discharge;
};
const isSickLeave = (param) => {
    if (param.startDate && param.endDate && isDate(param.startDate) && isDate(param.endDate)) {
        return param;
    }
    else
        return false;
};
const parseSickLeave = (sickLeave) => {
    if (!sickLeave || !isSickLeave(sickLeave)) {
        throw new Error('Incorrect or missing sickleave');
    }
    return sickLeave;
};
const isHealthCheckRating = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing healthcheckrating');
    }
    return healthCheckRating;
};
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description');
    }
    return description;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist');
    }
    return specialist;
};
const toEntry = (entry) => {
    console.log('entry to be added', entry);
    const newEntry = {
        description: parseDescription(entry.description),
        date: parseDate(entry.date),
        specialist: parseSpecialist(entry.specialist),
    };
    if (entry.diagnosisCodes) {
        if (Array.isArray(entry.diagnosisCodes)) {
            const codes = entry.diagnosisCodes.map((c) => parseName(c));
            if (codes) {
                newEntry.diagnosisCodes = codes;
            }
        }
    }
    switch (entry.type) {
        case "Hospital":
            const hospitalEntry = Object.assign({ type: entry.type, discharge: parseDischarge(entry.discharge) }, newEntry);
            return hospitalEntry;
        case "OccupationalHealthcare":
            const occupationalEntry = Object.assign({ type: entry.type, employerName: parseName(entry.employerName), sickLeave: parseSickLeave(entry.sickLeave) }, newEntry);
            return occupationalEntry;
        case "HealthCheck":
            const healthcheckEntry = Object.assign({ type: entry.type, healthCheckRating: parseHealthCheckRating(entry.healthCheckRating) }, newEntry);
            return healthcheckEntry;
        default:
            throw new Error('`Unhandled discriminated union member:');
    }
};
exports.toEntry = toEntry;
