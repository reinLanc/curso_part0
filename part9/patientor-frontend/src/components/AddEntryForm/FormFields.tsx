import { TextField } from "@mui/material";

interface FormFieldProps {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  fullWidth?: boolean;
}

const FormField = ({ label, value, onChange, type = 'text', fullWidth = true }: FormFieldProps) => {
  return (
    <TextField
      label={label}
      fullWidth={fullWidth}
      value={value}
      onChange={onChange}
      type={type}
      style={{ marginBottom: "1em" }}
      InputLabelProps={type === 'date' ? { shrink: true } : undefined}
    />
  );
};

export default FormField;