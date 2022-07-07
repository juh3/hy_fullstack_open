import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries'
import parseFilter from '../utils/parseFilter';

const useRepositories = (filter, keyword) => {
  
  let searchObject = parseFilter(filter)
  let variables = { ...searchObject, searchKeyword: keyword, first: 5}
  const {data, loading, fetchMore, refetch} = useQuery(GET_REPOSITORIES, { fetchPolicy: 'cache-and-network', variables: variables})

  const handleFetchMore = () => {
    console.log('im HERE')
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };


  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    refetch,
  };
  
  
};

export default useRepositories;