import { Diagnose } from "./diagnose";

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
    // eslint-disable-next-line @/no-unused-vars
    Healthy = 0,
    // eslint-disable-next-line @/no-unused-vars
    LowRisk = 1,
    // eslint-disable-next-line @/no-unused-vars
    HighRisk = 2,
    // eslint-disable-next-line @/no-unused-vars
    CriticalRisk = 3,
}

export interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: {
        date: string;
        criteria: string;
    };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: {
      startDate: string;
      endDate: string;
    };
  }
  
  export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;