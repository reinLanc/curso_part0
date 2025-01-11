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

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const patient = patientService.getPatientById(id);

    if(!patient) {
         res.status(404).json({error: 'Patient not found'});
         return;
    }

    res.json(patient);
});

router.post('/:id/entries', (req, res) => {
    const { id } = req.params;

    try {
        const patient = patientService.getPatientById(id);

        if(!patient) {
            res.status(404).json({error: 'Patient not fond'});
            return;
        }

        const newEntry = patientService.toNewEntry(req.body);
        const updatedPatient = patientService.addEntryToPatient(id, newEntry);
        res.json(updatedPatient);
    } catch (error) {
        res.status(400).send(error instanceof Error ? error.message : 'Unknown error');
    }
});

export default router;
