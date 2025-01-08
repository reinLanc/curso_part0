import diagnoses from '../data/diagnoses';
import { Diagnose } from "../types/diagnose";

const getDiagnoses = (): Diagnose[] => {
    return diagnoses; 
};

export default {
    getDiagnoses
};