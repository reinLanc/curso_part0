import React from "react";
import { Box, Typography } from "@mui/material";
import { LocalHospital } from "@mui/icons-material";
import { HospitalEntry } from "../../../types";

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Box style={{ border: "1px solid gray", padding: "1em", marginBottom: "1em" }}>
      <Typography variant="h6">
        {entry.date} <LocalHospital />
      </Typography>
      <Typography>{entry.description}</Typography>
      <Typography>
        Discharge: {entry.discharge.date} - {entry.discharge.criteria}
      </Typography>
    </Box>
  );
};

export default Hospital;

