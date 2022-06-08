"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatientEntry = void 0;
const types_1 = require("./types");
const toNewPatientEntry = ({ name, dateOfBirth, ssn, occupation, gender }) => {
    const newEntry = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseName(ssn),
        occupation: parseName(occupation),
        gender: parseGender(gender)
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
