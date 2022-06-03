import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS, ME } from '../queries'

const RecommendGenre = (props) => {
  const result = useQuery(ME)
  const booksresult = useQuery(ALL_BOOKS)

  if (result === null) {
    return <p> Not logged in</p>
  }
  if (result.loading || booksresult.loading) {
    return <p> loading ... </p>
  }

  const books = booksresult.data.allBooks
  const favouritegenre = result?.data?.me?.favouriteGenre
  console.log(books)
  if (!props.show) {
    return null
  }

  const filteredbooklist = books.filter((e) =>
    e.genres.includes(favouritegenre) ? e : null
  )
  console.log(filteredbooklist)

  const padding = {
    padding: 5,
  }

  return (
    <div>
      <div>
        <h2> Your favourite genre is {favouritegenre}</h2>
        <p> Here are some books recommended to you!</p>
      </div>

      <table>
        <tbody>
          <tr>
            <th>author</th>
            <th>title</th>
          </tr>
          {filteredbooklist.map((e) => (
            <tr key={e.title}>
              <td>{e.author.name}</td>
              <td style={padding}>{e.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecommendGenre
