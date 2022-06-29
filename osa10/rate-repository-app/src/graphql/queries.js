import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repository {
    repositories {
      edges {
        node {
          id
          description
          ownerAvatarUrl
          forksCount
          stargazersCount
          reviewCount
          ratingAverage
          name
          fullName
          language
        }
      }
    }
  }
`

export const ME = gql`
  query Me{
    me{
      id
      username
    }  
  }
`