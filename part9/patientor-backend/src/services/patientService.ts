import { v1 as uuid } from 'uuid';
import patientsRaw from '../data/patients';
import { Patient, NonSensitivePatient, NewPatient, Gender } from '../types/patient';

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
    if (!Object.values(Gender).includes(gender)) {
        throw new Error(`Invalid gender: ${gender}`);
    }
    return gender as Gender;
};

const parsePatients = (data: any[]): Patient[] => {
    return data.map((patient) => ({
        ...patient,
        gender: parseGender(patient.gender),
    }));
};

const patients: Patient[] = parsePatients(patientsRaw);

const toNewPatient = (object: any): NewPatient => {
    if (!isString(object.name)) {
        throw new Error('Invalid or missing name');
    }
    if (!isString(object.dateOfBirth)) {
        throw new Error('Invalid or missing dateOfBirth');
    }
    if (!isString(object.ssn)) {
        throw new Error('Invalid or missing ssn');
    }
    if (!isGender(object.gender)) {
        throw new Error('Invalid or missing gender');
    }
    if (!isString(object.occupation)) {
        throw new Error('Invalid or missing occupation');
    }

    return {
        name: object.name,
        dateOfBirth: object.dateOfBirth,
        ssn: object.ssn,
        gender: object.gender,
        occupation: object.occupation,
    };
};

const getPatients = (): Patient[] => {
    return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (newPatient: NewPatient): Patient => {
    const patient = {
        ...newPatient,
        id: uuid(),
    };

    patients.push(patient); 
    return patient;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    toNewPatient,
};
