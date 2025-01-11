import React from "react";
import { Box, Typography } from "@mui/material";
import { Entry } from "../../types";
import HealthCheck from "./entries/HealthCheck";
import Hospital from "./entries/Hospital";
import OccupationalHealthcare from "./entries/OccupationalHealthcare";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    case "Hospital":
      return <Hospital entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    default:
      return (
        <Box style={{ border: "1px solid red", padding: "1em", marginBottom: "1em" }}>
          <Typography variant="h6">Unknown Entry Type</Typography>
        </Box>
      );
  }
};

export default EntryDetails;
