import { FormControl, InputLabel, Select, MenuItem, Chip } from "@mui/material";
import { Diagnosis } from "../../types";

interface DiagnosisCodesProps {
  diagnosisCodes: string[];
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string[]>>;
  diagnoses: Diagnosis[];
}

const DiagnosisCodes = ({ diagnosisCodes, setDiagnosisCodes, diagnoses }: DiagnosisCodesProps) => {
  return (
    <FormControl fullWidth style={{ marginBottom: "1em" }}>
      <InputLabel>Diagnosis Codes</InputLabel>
      <Select
        multiple
        value={diagnosisCodes}
        onChange={({ target }) => setDiagnosisCodes(target.value as string[])}
        renderValue={(selected) => (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </div>
        )}
        label="Diagnosis Codes"
      >
        {diagnoses.map(({ code, name }) => (
          <MenuItem key={code} value={code}>
            {`${code} - ${name}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DiagnosisCodes;

