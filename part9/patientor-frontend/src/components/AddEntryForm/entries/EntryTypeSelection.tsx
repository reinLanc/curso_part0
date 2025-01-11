import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";

const EntryTypeSelection = ({ type, handleTypeChange }: { type: string, handleTypeChange: (event: SelectChangeEvent<string>) => void }) => {
  return (
    <FormControl fullWidth style={{ marginBottom: "1em" }}>
      <InputLabel shrink>Entry Type</InputLabel>
      <Select value={type} onChange={handleTypeChange} label="Entry Type">
        <MenuItem value="HealthCheck">HealthCheck</MenuItem>
        <MenuItem value="Hospital">Hospital</MenuItem>
        <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
      </Select>
    </FormControl>
  );
};

export default EntryTypeSelection;

