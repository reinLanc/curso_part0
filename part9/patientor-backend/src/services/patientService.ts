import { v1 as uuid } from 'uuid';
import patientsRaw from '../data/patients-full';
import { Patient, NonSensitivePatient, NewPatient, Gender } from '../types/patient';
import { BaseEntry, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckRating } from '../types/entry';

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
        entries: patient.entries || []
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
        entries: object.entries || []
    };
};

const getPatients = (): Patient[] => {
    return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
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

const getPatientById = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
};

const parseDiagnosisCodes = (object: unknown): Array<string> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        return [] as Array<string>;
    }
    return object.diagnosisCodes as Array<string>;
};

const parseStringField = (field: any, fieldName: string): string => {
    if (!isString(field)) {
        throw new Error(`Invalid or missing date: ${fieldName}`);
    }
    return field;
};

const parseDate = (date: any): string => {
    if (!isString(date) || isNaN(Date.parse(date))) {
        throw new Error(`Invalid or missing date: ${date}`);
    }
    return date;
};

const parseHealthCheckRating = (rating: any): number => {
    if (typeof rating !== 'number' || !(rating in HealthCheckRating)) {
        throw new Error(`Invalid or missing healthCheckRating: ${rating}`);
    }
    return rating;
};

const parseBaseEntry = (entry: any): BaseEntry => ({
    id: uuid(),
    description: parseStringField(entry.description, 'description'),
    date: parseDate(entry.date),
    specialist: parseStringField(entry.specialist, 'specialist'),
    diagnosisCodes: parseDiagnosisCodes(entry),
});

const parseHealthCheckEntry = (entry: any): HealthCheckEntry => ({
    ...parseBaseEntry(entry),
    type: 'HealthCheck',
    healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
});

const parseHospitalEntry = (entry: any): HospitalEntry => ({
    ...parseBaseEntry(entry),
    type: 'Hospital',
    discharge: {
        date: parseDate(entry.discharge?.date),
        criteria: parseStringField(entry.discharge?.criteria, 'discharge.criteria'),
    },
});

const parseOccupationalHealthcareEntry = (entry: any): OccupationalHealthcareEntry => ({
    ...parseBaseEntry(entry),
    type: 'OccupationalHealthcare',
    employerName: parseStringField(entry.employerName, 'employerName'),
    sickLeave: entry.sickLeave
        ? {
            startDate: parseDate(entry.sickLeave.startDate),
            endDate: parseDate(entry.sickLeave.endDate),
        }
        : undefined,
});

const toNewEntry = (entry: any): Entry => {
    switch (entry.type) {
        case 'HealthCheck':
            return parseHealthCheckEntry(entry);
        case 'Hospital':
            return parseHospitalEntry(entry);
        case 'OccupationalHealthcare':
            return parseOccupationalHealthcareEntry(entry);
        default:
            throw new Error(`Unsupported entry type: ${entry.type}`);
    }
};

const addEntryToPatient = (id: string, entry: Entry): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    if (!patient) {
        return undefined;
    }
    const newEntry = { ...entry, id: uuid() };
    patient.entries.push(newEntry);
    return patient;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    toNewPatient,
    getPatientById,
    toNewEntry,
    addEntryToPatient
};
