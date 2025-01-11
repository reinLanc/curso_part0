import { TextField } from "@mui/material";

const HealthCheckFields = ({ healthCheckRating, setHealthCheckRating }: { healthCheckRating: number | undefined, setHealthCheckRating: React.Dispatch<React.SetStateAction<number | undefined>> }) => (
  <TextField
    label="Health Check Rating"
    type="number"
    fullWidth
    value={healthCheckRating ?? ""}
    onChange={({ target }) => setHealthCheckRating(Number(target.value))}
    inputProps={{ min: 1, max: 3 }}
  />
);

export default HealthCheckFields;
