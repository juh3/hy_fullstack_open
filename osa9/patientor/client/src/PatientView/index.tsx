import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient } from '../types';

const PatientView = async () => {
  const { id } = useParams<{ id: string }>();

  try{
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
    console.log(patient);

  } catch (e) {
    console.error(e);
  }

  return(
    <p> Trying to fetch data for the patient </p>
  );
};

export default PatientView;