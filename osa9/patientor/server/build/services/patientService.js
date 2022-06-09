"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_json_1 = __importDefault(require("../data/patients.json"));
const uuid_1 = require("uuid");
const patients = patients_json_1.default;
const getPatients = () => {
    return patients.map(({ id, name, dateOfBirth, occupation, gender, entries }) => ({
        id,
        name,
        dateOfBirth,
        occupation,
        gender,
        entries
    }));
};
const addPatient = (entry) => {
    const id = (0, uuid_1.v1)();
    const newPatientEntry = Object.assign({ id: id }, entry);
    patients.push(newPatientEntry);
    return newPatientEntry;
};
const findById = (id) => {
    const patient = patients.find(d => d.id === id);
    return patient;
};
exports.default = {
    getPatients,
    addPatient,
    findById
};
