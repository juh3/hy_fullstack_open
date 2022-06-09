import React from 'react'

const Content = ( { courseParts }: { courseParts[] =  name: string, exerciseCount: number })=> {
  return (
    <div>
    {courseParts.map( e => (
      <li key={e.name}>
        <p> {courseParts.name} {courseParts.exerciseCount} </p>
      </li>
    ))
    };
    </div>
    
  );
};
export default Content