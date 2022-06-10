import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from '../types';
import React from 'react';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { SvgIcon } from "@material-ui/core";
import { setSinglePatient } from '../state/reducer';
import ShowEntry from "./ShowEntry";

const PatientView =  () => {
  const [{ patient } , dispatch ] = useStateValue();



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

  console.log(patient);

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




  return(
    <div> 
      <h1>{patient?.name} {GenderIcon()} </h1>
      <p> ssn: {patient?.ssn} </p>
      <p> occupation: {patient?.occupation} </p>
      <h2> Entries</h2>
      {patient?.entries?.map( (entry) => (
        <ShowEntry key = {entry.id} entry = {entry} />
      ))
      } 

   </div>
  );
};

export default PatientView;