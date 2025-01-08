export enum Gender {
    // eslint-disable-next-line @/no-unused-vars
    Male = 'male',
    // eslint-disable-next-line @/no-unused-vars
    Female = 'female',
    // eslint-disable-next-line @/no-unused-vars
    Other = 'other'
}
export interface Patient {
    id: string;
    name: string
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;