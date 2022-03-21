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
  const Course = (props) =>{
    return(
      <div>
        <Header course = {props.course}/>
        
      </div>
    )
  }
  const Header = (props) =>(
    <h1> {props.course.name}</h1>
  )
  
  return (
    <div>
      <Course course={course} />
      <ul> {course.parts.map(part =>
           <li key = {part.id}>
             {part.name} {part.exercises}
             </li>
            )}
      </ul>
    </div>
  )
}
export default App