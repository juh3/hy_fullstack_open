const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const Header = (props) => {
    return (
      <h1>{props.name}</h1>
    )
  }
  const Content = (props) => {
    return(
      <div> 
      <Part part = {props.parts[0]} />
      <Part part = {props.parts[1]} />
      <Part part = {props.parts[2]} />
    </div>
    )
  }

  const Part = (props) =>{
    console.log(props)
    return(
      <p> {props.part['name']} {props.part['exercises']} </p>
    )
  }
  const Total = (props) => {
    const total = props.p1['exercises'] + props.p2['exercises'] + props.p3['exercises']
    return(
      <p> Number of exercises {total}</p>
    )
  }
  return (
    <div>
      <Header name = {course.name}/>
      <Content parts = {course.parts}/>
      <Total p1 = {course.parts[0]} p2 = {course.parts[1]} p3 = {course.parts[2]}/>
    </div>
  )
} 
export default App