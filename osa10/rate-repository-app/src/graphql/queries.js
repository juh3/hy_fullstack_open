import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
    )
     {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
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
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
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
  query Repository(
    $repositoryId: ID!
    $first: Int
    $after: String
    ) {
    repository(id: $repositoryId) {
      id
      fullName
      reviews(first: $first, after: $after) {
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
          cursor
        }
        pageInfo{
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`

export const ExampleQuery = gql`
  query Reviews($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      reviews(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
        edges {
          cursor
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