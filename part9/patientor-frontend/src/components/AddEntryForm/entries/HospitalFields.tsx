import FormField from "../FormFields";

const HospitalFields = ({ dischargeDate, dischargeCriteria, setDischargeDate, setDischargeCriteria }: { dischargeDate: string, dischargeCriteria: string, setDischargeDate: React.Dispatch<React.SetStateAction<string>>, setDischargeCriteria: React.Dispatch<React.SetStateAction<string>> }) => (
  <>
    <FormField label="Discharge Date" value={dischargeDate} onChange={({ target }) => setDischargeDate(target.value)} type="date" />
    <FormField label="Discharge Criteria" value={dischargeCriteria} onChange={({ target }) => setDischargeCriteria(target.value)} />
  </>
);

export default HospitalFields;
