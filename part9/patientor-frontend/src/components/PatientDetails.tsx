import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Entry, Patient, Diagnosis } from "../types";
import { Button, Container, List, Typography } from "@mui/material";
import { Female, Male, Transgender } from "@mui/icons-material";
import patientService from "../services/patients";
import diagnoseService from "../services/diagnose";
import EntryDetails from "./EntryDetails/EntryDetails";
import AddEntryForm from "./AddEntryForm/AddEntryForm";

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const patient = await patientService.getById(id!);
        setPatient(patient);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };
    void fetchPatientDetails();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const diagnoses = await diagnoseService.getAll();
        setDiagnoses(diagnoses);
      } catch (error) {
        console.error("Error fetching diagnoses:", error);
      }
    };
    void fetchDiagnoses();
  }, []);

  if (!patient) {
    return <Typography>Loading patient details...</Typography>;
  }

  const genderIcon = () => {
    switch (patient.gender) {
      case "male":
        return <Male />;
      case "female":
        return <Female />;
      default:
        return <Transgender />;
    }
  };

  const patientDiagnoses = diagnoses.filter((diagnosis) =>
    patient.entries.some((entry) =>
      entry.diagnosisCodes?.includes(diagnosis.code)
    )
  );

  const handleAddEntry = async (newEntry: Omit<Entry, "id">) => {
    try {
      const updatedPatient = await patientService.addEntry(
        patient.id,
        newEntry
      );
      setPatient(updatedPatient);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding entry:", error);
      setError("Failed to add entry. Please check your input.");
    }
  };

  return (
    <Container>
      <Typography variant="h4">
        {patient.name} {genderIcon()}
      </Typography>
      <Typography>ssh: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      <Typography style={{ fontWeight: "bold", marginTop: "1em" }}>
        Diagnoses:
      </Typography>
      {patientDiagnoses.length > 0 ? (
        <List>
          {patientDiagnoses.map((diagnosis) => (
            <li key={diagnosis.code}>
              <Typography>
                {diagnosis.code}: {diagnosis.name}{" "}
                {diagnosis.latin && `(${diagnosis.latin})`}
              </Typography>
            </li>
          ))}
        </List>
      ) : (
        <Typography>No diagnoses found.</Typography>
      )}
      <Typography style={{ fontWeight: "bold", marginTop: "1em" }}>
        Entries:
      </Typography>
      {patient.entries.length > 0 ? (
        <List>
          {patient.entries.map((entry: Entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </List>
      ) : (
        <Typography>No entries found.</Typography>
      )}
      <Button
        variant="contained"
        onClick={() => setShowForm(true)}
        style={{ marginTop: "1em", marginBottom: "1em" }}
      >
        Add New Entry
      </Button>
      {showForm && (
        <AddEntryForm
          onSubmit={handleAddEntry}
          onCancel={() => setShowForm(false)}
        />
      )}
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
};

export default PatientDetails;
