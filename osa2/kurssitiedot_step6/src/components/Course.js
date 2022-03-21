const Course = (props) =>{

    return(
    <div>
      <Header course = {props.course}/>
      <Part course = {props.course}/>
      <Total course = {props.course.parts}/>
    </div>
    )
    }

  const Header = (props) =>{
    return(
  
    <h2> {props.course.name}</h2>
    )
  }

  const Part = (props) =>{

    return(

      <ul> {props.course.parts.map(part =>
        <li key = {part.id}>
          {part.name} {part.exercises}
          </li>
         )}
   </ul>
    )   
  }


  const Total = (props) =>{
    const array_of_exercises = props.course.map(part => part.exercises)
    const initialValue = 0
    const total = array_of_exercises.reduce((s,p)=> s + p, initialValue)
    return(
      <p><strong>total of {total} exercises</strong> </p>
    )
  }
  
  export default Course