import React from 'react';
import { courseProps } from '../types';

const Total = ({ courseParts }: courseProps) => {
  return (  
    <div> 
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
}

export default Total