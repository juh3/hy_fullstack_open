import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    )
     {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      ) {
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

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
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
      url
    }
  }
`

export const GET_REVIEWS = gql`
  query Node($repositoryId: ID!) {
    repository(id: $repositoryId) {
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`