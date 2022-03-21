  //simple component return with a wavebracket
  const Course = (props) =>(
    <Header course = {props.course}/>
    )

  const Header = (props) =>(
    <h1> {props.course.name}</h1>
    )

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
      <p>total of {total} exercises </p>
    )
  }
  
const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },

      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
      <Part course = {course}/>
      <Total course = {course.parts}/>
      
    </div>
  )
}
export default App