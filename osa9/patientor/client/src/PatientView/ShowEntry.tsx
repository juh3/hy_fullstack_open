import { HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry } from '../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import HealingIcon from '@mui/icons-material/Healing';
/*import FavoriteIcon from '@mui/icons-material/Favorite';*/
import { SvgIcon } from "@material-ui/core";
import './PatientStyle.css';
export const RenderHospitalEntry = ( {entry} : {entry: HospitalEntry }) => {
  return(
    <div className = "entry">
      <p >{entry.date} <SvgIcon component = {LocalHospitalIcon}  sx={{ fontSize: 40 }}/></p>
      <p > {entry.description}</p>
      <p > diagnose by {entry.specialist}</p>
    </div>
  );
};

export const RenderOccupationalEntry = (  {entry} : {entry: OccupationalHealthcareEntry} ) => {

  return(
    <div className = "entry">
      <p > {entry.date} <SvgIcon component = {HealthAndSafetyIcon}  sx={{ fontSize: 40 }}/></p>
      <p > {entry.description}</p>

      <p > diagnose by {entry.specialist}</p>
    </div>
  );
};

export const RenderCheckEntry = ( {entry}  : {entry: HealthCheckEntry}) => {

  return(

    <div className = "entry">
      <p>{entry.date} <SvgIcon component = {HealingIcon}  sx={{ fontSize: 40 }}/></p>
      <p> {entry.description}</p>
      <p> diagnose by {entry.specialist}</p>
    </div>
  );
};
