import { TypeProps } from '../types'
const Part = ({ part }: TypeProps) => {

  switch( part.type) {

    case "normal":
      return(
        <div>
          <h2> {part.name} {part.exerciseCount}</h2>
          <p> { part.description} </p>
        </div>
      )

    case "groupProject":
      return(
        <div>
          <h2> {part.name} {part.exerciseCount}</h2>
          <p> project exercises {part.groupProjectCount} </p>
        </div>
      )

    case "submission":
      return(
        <div>
          <h2> {part.name} {part.exerciseCount}</h2>
          <p> {part.description}</p>
          <p> {part.exerciseSubmissionLink}</p>
        </div>
      )

    case "special":
      return(
        <div>
          <h2> {part.name} {part.exerciseCount}</h2>
          <p> {part.description}</p>
          <p> requirements: {part.requirements} </p>
        </div>
      )
    default:
      return(
        <p> should not be here</p>
      );
  }
};

export default Part;