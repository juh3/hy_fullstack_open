import React, { useState } from 'react'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import { useMutation, useQuery } from '@apollo/client'

const AuthorForm = () => {
  const [name, setName] = useState('')
  let [birthyear, setBirthyear] = useState('')
  const [editEntry] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ ALL_AUTHORS }],
  })
  const authors = useQuery(ALL_AUTHORS)
  const handleSubmit = (event) => {
    event.preventDefault()
    let setBornTo = parseInt(birthyear)
    console.log(name, setBornTo)
    editEntry({ variables: { name, setBornTo } })

    setName('')
    setBirthyear('')
  }

  return (
    <div>
      <h2> Set birthyear</h2>

      <div>
        <form onSubmit={handleSubmit}>
          <select
            style={{ width: '50%' }}
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            {authors.map((author) => (
              <option key={author.id}> {author.name}</option>
            ))}
          </select>

          <div>
            born
            <input
              value={birthyear}
              onChange={({ target }) => setBirthyear(target.value)}
            ></input>
          </div>
          <button type="submit"> update Author</button>
        </form>
      </div>
    </div>
  )
}

export default AuthorForm
