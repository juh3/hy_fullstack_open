import React from 'react';
import { EntryProps } from '../types';

const ShowEntry = ({ entry }: EntryProps) => {
  return (
    <div>
      <p> {entry.date} {entry.description}</p>
      {entry.diagnosisCodes?.map( code => (
        <li key = {code}>
          {code}
        </li>
      ))}
    </div>
  );
};

export default ShowEntry;