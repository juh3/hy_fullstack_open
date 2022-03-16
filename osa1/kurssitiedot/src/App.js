const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }
  const Part = (props) => {
    return(
      <div>
        <p>{props.part} {props.ex}</p>
      </div>
  )
}
  const Content = (props) => {
    return(
      <div> 
        <Part part= {part1} ex = {exercises1}/>
        <Part part = {part2} ex = {exercises2}/>
        <Part part = {part3} ex = {exercises3}/>
      </div>
      )
    }

  const Total = (props) => {
      const total = props.ex1 + props.ex2 + props.ex3
      return(
        <p>Number of exercises {total}</p>
      )
    } 
    return (
      <div>
        <Header course={course}/>
        <Content/>
        <Total ex1 = {exercises1} ex2 = {exercises2} ex3 = {exercises3}/>
      </div>
    
  )
}
export default App