import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SingleUser = () => {
  const userlist = useSelector((state) => state.allUsers)
  const match = useMatch('/users/:id')
  const user = match
    ? userlist.find((user) => user.id === match.params.id)
    : null
  console.log(user)

  if (!user) {
    return <p> loading </p>
  }
  return (
    <div>
      <h1> {user.name} </h1>
      <h2> added blogs </h2>

      <ul className="second-ul">
        {user.blogs.map((info) => (
          <li key={info.id}>{info.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default SingleUser
