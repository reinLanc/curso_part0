import { useState, useEffect, SyntheticEvent } from "react";
import { Grid, Button } from "@mui/material";
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckRating } from "../../types";
import diagnosesService from "../../services/diagnose";
import FormField from "./FormFields";
import DiagnosisCodes from "./DiagnosisCodes";
import EntryTypeSelection from "./entries/EntryTypeSelection";
import HealthCheckFields from "./entries/HealthCheckFields";
import HospitalFields from "./entries/HospitalFields";
import OccupationalHealthcareFields from "./entries/OccupationalHealthcareFields";
import { Diagnosis } from "../../types";
import { SelectChangeEvent } from "@mui/material";

interface Props {
  onSubmit: (entry: Entry) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [type, setType] = useState<"HealthCheck" | "Hospital" | "OccupationalHealthcare">("HealthCheck");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating | undefined>();
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const data = await diagnosesService.getAll();
        setDiagnoses(data);
      } catch (error) {
        console.error("Failed to fetch diagnoses:", error);
      }
    };
    fetchDiagnoses();
  }, []);

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    const newType = event.target.value as "HealthCheck" | "Hospital" | "OccupationalHealthcare";
    setType(newType);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.length ? diagnosisCodes : undefined,
    };

    let newEntry: Entry;

    if (type === "HealthCheck") {
      if (healthCheckRating === undefined) return alert("Provide valid HealthCheckRating (0-3)");
      newEntry = { ...baseEntry, type, healthCheckRating } as HealthCheckEntry;
    } else if (type === "Hospital") {
      if (!dischargeDate || !dischargeCriteria) return alert("Provide Discharge Date and Criteria");
      newEntry = { ...baseEntry, type, discharge: { date: dischargeDate, criteria: dischargeCriteria } } as HospitalEntry;
    } else if (type === "OccupationalHealthcare") {
      if (!employerName) return alert("Provide Employer Name");
      newEntry = {
        ...baseEntry,
        type,
        employerName,
        sickLeave: sickLeaveStartDate && sickLeaveEndDate
          ? { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate }
          : undefined,
      } as OccupationalHealthcareEntry;
    } else {
      return alert("Invalid entry type");
    }
    onSubmit(newEntry);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormField label="Description" value={description || ""} onChange={({ target }) => setDescription(target.value)} />
      <FormField label="Date" value={date || ""} onChange={({ target }) => setDate(target.value)} type="date" />
      <FormField label="Specialist" value={specialist || ""} onChange={({ target }) => setSpecialist(target.value)} />
      <DiagnosisCodes diagnosisCodes={diagnosisCodes} setDiagnosisCodes={setDiagnosisCodes} diagnoses={diagnoses} />
      <EntryTypeSelection type={type} handleTypeChange={handleTypeChange} />
      
      {type === "HealthCheck" && (
        <HealthCheckFields healthCheckRating={healthCheckRating} setHealthCheckRating={setHealthCheckRating} />
      )}
      {type === "Hospital" && (
        <HospitalFields
          dischargeDate={dischargeDate || ""}
          dischargeCriteria={dischargeCriteria || ""}
          setDischargeDate={setDischargeDate}
          setDischargeCriteria={setDischargeCriteria}
        />
      )}
      {type === "OccupationalHealthcare" && (
        <OccupationalHealthcareFields
          employerName={employerName || ""}
          sickLeaveStartDate={sickLeaveStartDate || ""}
          sickLeaveEndDate={sickLeaveEndDate || ""}
          setEmployerName={setEmployerName}
          setSickLeaveStartDate={setSickLeaveStartDate}
          setSickLeaveEndDate={setSickLeaveEndDate}
        />
      )}
      <Grid container spacing={2} style={{ marginTop: "1em" }}>
        <Grid item>
          <Button color="secondary" variant="contained" onClick={onCancel}>
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddEntryForm;

