import { Box, Typography } from "@mui/material";
import { Work } from "@mui/icons-material";
import { OccupationalHealthcareEntry } from "../../../types";

const OccupationalHealthcare = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  return (
    <Box style={{ border: "1px solid gray", padding: "1em", marginBottom: "1em" }}>
      <Typography variant="h6">
        {entry.date} <Work /> {entry.employerName}
      </Typography>
      <Typography>{entry.description}</Typography>
      {entry.sickLeave && (
        <Typography>
          Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
        </Typography>
      )}
    </Box>
  );
};

export default OccupationalHealthcare;

