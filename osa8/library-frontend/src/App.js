import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LogIn from './components/LogIn'
import RecommendGenre from './components/RecommendGenre'
import { useApolloClient, useSubscription, gql } from '@apollo/client'
import { ALL_BOOKS } from './queries'

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      genres
      author {
        name
      }
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState('')
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert('A new book has been added')

      client.cache.updateQuery(
        { query: ALL_BOOKS },
        ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(addedBook),
          }
        }
      )
    },
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && (
          <button onClick={() => setPage('login')}> log in</button>
        )}
        {token && (
          <button onClick={() => setPage('add')}>add book</button>
        )}
        {token && (
          <button onClick={() => setPage('recommended')}>
            recommend
          </button>
        )}
        {token && <button onClick={logout}> logout </button>}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
      <RecommendGenre show={page === 'recommended'} />
      <LogIn setToken={setToken} show={page === 'login'} />
    </div>
  )
}

export default App
