import { Box, Typography } from "@mui/material";
import { Favorite, LocalHospital } from "@mui/icons-material";
import { HealthCheckEntry, HealthCheckRating } from "../../../types";

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
  const healthCheckIcon = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return <Favorite style={{ color: "green" }} />;
      case HealthCheckRating.LowRisk:
        return <Favorite style={{ color: "yellow" }} />;
      case HealthCheckRating.HighRisk:
        return <Favorite style={{ color: "orange" }} />;
      case HealthCheckRating.CriticalRisk:
        return <Favorite style={{ color: "red" }} />;
      default:
        return null;
    }
  };

  return (
    <Box style={{ border: "1px solid gray", padding: "1em", marginBottom: "1em" }}>
      <Typography variant="h6">
        {entry.date} <LocalHospital />
      </Typography>
      <Typography>{entry.description}</Typography>
      <Typography>Health Check Rating: {healthCheckIcon(entry.healthCheckRating)}</Typography>
    </Box>
  );
};

export default HealthCheck;

