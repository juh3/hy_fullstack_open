import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    published
    author
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const CREATE_BOOK = gql`
mutation AddBook(
  $title: String!,
  $author: String!,
  $published: Int!,
  $genres: [String!]!
) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
  }
}
`

export const EDIT_AUTHOR = gql`
mutation EditAuthor(
  $name: String!, 
  $setBornTo: Int!
) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
    id
  }
}
`