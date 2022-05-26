import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useState } from 'react'
const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  let [birthyear, setBirthyear] = useState('')
  const [ editEntry ] = useMutation(EDIT_AUTHOR, { refetchQueries: [{ query: ALL_AUTHORS } ]})

  if (result.loading) {
    return <div> loading... </div>
  }
  const authors = result.data.allAuthors
  if (!props.show) {
    return null
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let setBornTo = parseInt(birthyear)
    console.log(name, setBornTo)
    editEntry( { variables: { name, setBornTo } })

    setName('')
    setBirthyear('')
  }

  const padding = {
    padding: 10,
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td style={padding}>{a.name}</td>
              <td style={padding}>{a.born}</td>
              <td style={padding}>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
      <h2> Set birthyear</h2>

      <div style={ { alignItems: "center"}}>
        <form onSubmit = { handleSubmit}>
          <select style = { { width: "50%"}} value = { name} onChange = { ({ target }) => setName(target.value)}>
            {authors.map( author  => (
              <option key={author.born}> {author.name}</option>
            ))}
          </select>

          <div>
            born
            <input
              value = {birthyear}
              onChange = { ({ target }) => setBirthyear(target.value)}>
            </input>
          </div>
          <button type = "submit"> update Author</button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Authors
