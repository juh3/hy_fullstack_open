"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getPatients());
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientService_1.default.findById(id);
    if (!patient) {
        res.sendStatus(404);
    }
    else {
        res.send(patient);
    }
});
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
router.post('/', (req, res) => {
    try {
        const newPatientEntry = (0, utils_1.toNewPatientEntry)(req.body);
        const addedPatient = patientService_1.default.addPatient(newPatientEntry);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
