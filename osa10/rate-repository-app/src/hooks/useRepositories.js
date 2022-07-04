import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (filter) => {
  const [repositories, setRepositories] = useState()
  console.log(filter)
  const {data, loading, refetch} = useQuery(GET_REPOSITORIES, { fetchPolicy: 'cache-and-network', variables: {orderBy: { filter}}})

  const fetchRepositories = async () => {
    if(data !== undefined && data.repositories !== undefined ){
        setRepositories(data.repositories);
    }
  };

  useEffect(() => {
    fetchRepositories()
  }, [data])


  return { repositories, loading, refetch };
  
  
};

export default useRepositories;