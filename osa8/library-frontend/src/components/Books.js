import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState('no filter')

  if (result.loading) {
    return <div> loading... </div>
  }
  if (!props.show) {
    return null
  }

  const padding = {
    padding: 5,
  }

  const books = result.data.allBooks
  const filters = [
    'No filter',
    'Novel',
    'Romance',
    'Bildungsroman',
    'Philosophy',
    'Biography',
    'Fantasy',
  ]

  return (
    <div>
      <h2>books</h2>
      <p> filter on: {filter}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((a) =>
              filter === 'No filter' ? a : a.genres.includes(filter)
            )
            .map((e) => (
              <tr key={e.title}>
                <td>{e.title}</td>
                <td style={padding}>{e.author.name}</td>
                <td style={padding}>{e.published}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <div>
        {filters.map((a) => (
          <button
            key={a}
            value={a}
            onClick={({ target }) => setFilter(target.value)}
          >
            {a}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
