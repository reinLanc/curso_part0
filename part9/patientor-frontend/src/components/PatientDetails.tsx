import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import { Female, Male, Transgender } from "@mui/icons-material";

const PatientDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null);

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                setPatient(data);
            } catch (error) {
                console.error('Error fetching patient details:', error);
            }
        };
        void fetchPatientDetails();
    }, [id]);

    if (!patient) {
        return <Typography>Loading patient details...</Typography>;
    }

    const genderIcon = () => {
        switch (patient.gender) {
            case 'male':
                return <Male />;
            case 'female':
                return <Female />;
            default:
                return <Transgender />;
        }
    };

    return (
        <Container>
            <Typography variant="h4">{patient.name} {genderIcon()}</Typography>
            <Typography>ssh: {patient.ssn}</Typography>
            <Typography>occupation: {patient.occupation}</Typography>
        </Container>
    );
};

export default PatientDetails;