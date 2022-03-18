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
      }
    ]
  }
  const Course = (props) =>{
    return(
      <div>
        <Header course = {props.course}/>
        <Content course = {props.course.parts[0]}/>
        
      </div>
    )
  }
  const Header = (props) =>(
    <h1> {props.course.name}</h1>
  )
  
  const Content = (props) =>{
    return(
    <Part part = {props.course}/>
    )
  }
  const Part = (props) => (
    <p> {props.part['name']} {props.part['exercises']}</p>
  )
  
  return (
    <div>
      <Course course={course} />
    </div>
  )
}
export default App