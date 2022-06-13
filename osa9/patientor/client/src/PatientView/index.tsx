import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Entry, HospitalEntry, Patient } from '../types';
import React from 'react';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { SvgIcon } from "@material-ui/core";
import { setSinglePatient } from '../state/reducer';
import { RenderHospitalEntry, RenderCheckEntry, RenderOccupationalEntry } from "./ShowEntry";
import { Button } from "@material-ui/core";
import AddEntryModal from "./AddEntryModal";
import { setEntry } from "../state/reducer";
export type EntryFormValues = Omit<HospitalEntry, "id" | "">;

const PatientView =  () => {
  const [{ patient } , dispatch ] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  const { id } = useParams<{ id: string }>();

  React.useEffect( () => {

    const FetchPatientById = async () => {
      try{
        //eslint-disable-next-line
        const { data: patientFromApi } = await axios.get<Patient>
          (`${apiBaseUrl}/patients/${id}`         //eslint-disable-line
        );

        dispatch(setSinglePatient(patientFromApi));
        

      }  catch (e) {
        console.error(e);
      }

    };
    if (!patient || id !== patient?.id) {
      void FetchPatientById();
    }
  }, [patient, id, dispatch]);

  const GenderIcon = () => {
    switch( patient?.gender){
      case "male":
        return <SvgIcon component = {MaleIcon}  sx={{ fontSize: 40 }}/>;
      case "female":
        return <SvgIcon component = {FemaleIcon}  sx={{ fontSize: 40 }}/>;
      
      default:
        return <SvgIcon component = {QuestionMarkIcon}  sx={{ fontSize: 40 }}/>;
      
    }
  };

  const EntryDetails = ( {entry}: {entry: Entry}) => {
    switch( entry.type) {
      case "Hospital":
        return <RenderHospitalEntry entry = {entry} />;
      case "OccupationalHealthcare":
        return <RenderOccupationalEntry entry = {entry} />;
      case "HealthCheck":
        return <RenderCheckEntry entry = { entry } />;
      default:
        return assertNever(entry);
    }
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const submitNewEntry = async(values: EntryFormValues) => {
    try{
      console.log(values);
      const { data: new_entry} = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,  //eslint-disable-line
        values
      );
      dispatch(setEntry(new_entry));
      closeModal();
    } catch( e:unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };


  return(
    <div> 
      <h1>{patient?.name} {GenderIcon()} </h1>
      <p> ssn: {patient?.ssn} </p>
      <p> occupation: {patient?.occupation} </p>
      <h2> Entries</h2>
      <div>
        {patient?.entries?.map( (entry) => (
          <EntryDetails key = {entry.id} entry = {entry} />
        ))}
      </div>
      
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>


   </div>
  );
};

export default PatientView;