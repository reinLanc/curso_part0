import express from 'express';
import patientService from '../services/patientService';
import { NewPatient } from '../types/patient';

const router = express.Router();

router.get('/', (_req, res) =>{
    res.json(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
    try {
        const newPatient: NewPatient = patientService.toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error) {
        res.status(400).send(error instanceof Error ? error.message : 'Unknown error');
    }
});

export default router;
