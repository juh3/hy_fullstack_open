"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const patients = patients_1.default;
const getPatients = () => {
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
const addPatient = (entry) => {
    const newPatientEntry = Object.assign({ id: (0, uuid_1.v1)(), entries: [] }, entry);
    patients.push(newPatientEntry);
    return newPatientEntry;
};
const findById = (id) => {
    const patient = patients.find(d => d.id === id);
    return patient;
};
const addEntry = (entry, patient) => {
    const newEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patient.entries.push(newEntry);
    return patient;
};
exports.default = {
    getPatients,
    addPatient,
    findById,
    addEntry
};
