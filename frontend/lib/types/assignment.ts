import Medication from "./medication";
import Patient from "./patient";

interface Assignment {
  id: number;
  startDate: string;
  duration: number;
  patient: Patient;
  medication: Medication;
}

export default Assignment;
