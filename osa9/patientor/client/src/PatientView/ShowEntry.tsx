import { Diagnose, EntryProps } from '../types';
import { useStateValue } from "../state";

const ShowEntry = ({ entry }: EntryProps) => {
  const [{ diagnoses }  ] = useStateValue();


  const findDiagnose = (code : string) => {
    const diagnosis: Diagnose | undefined = diagnoses.find( c => c.code === code);
    return(
      <p> {code} {diagnosis?.name} </p>
    );
  };

  console.log(diagnoses);
  return (
    <div>
      <p> {entry.date} {entry.description}</p>
      <ul>
        {entry.diagnosisCodes?.map( code => (
          <li key = {code}>
            {findDiagnose(code)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowEntry;