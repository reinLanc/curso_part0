import FormField from "../FormFields";

const OccupationalHealthcareFields = ({ employerName, sickLeaveStartDate, sickLeaveEndDate, setEmployerName, setSickLeaveStartDate, setSickLeaveEndDate }: { employerName: string, sickLeaveStartDate: string, sickLeaveEndDate: string, setEmployerName: React.Dispatch<React.SetStateAction<string>>, setSickLeaveStartDate: React.Dispatch<React.SetStateAction<string>>, setSickLeaveEndDate: React.Dispatch<React.SetStateAction<string>> }) => (
  <>
    <FormField label="Employer Name" value={employerName} onChange={({ target }) => setEmployerName(target.value)} />
    <FormField label="Sick Leave Start Date" value={sickLeaveStartDate} onChange={({ target }) => setSickLeaveStartDate(target.value)} type="date" />
    <FormField label="Sick Leave End Date" value={sickLeaveEndDate} onChange={({ target }) => setSickLeaveEndDate(target.value)} type="date" />
  </>
);

export default OccupationalHealthcareFields;
