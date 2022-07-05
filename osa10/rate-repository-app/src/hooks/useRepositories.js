import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries'
import parseFilter from '../utils/parseFilter';

const useRepositories = (filter, keyword) => {
  const [repositories, setRepositories] = useState()
  console.log(filter)
  console.log(keyword)
  const searchObject = parseFilter(filter)
  console.log(searchObject)
  const filterObject = { ...searchObject, searchKeyword: keyword}
  const {data, loading} = useQuery(GET_REPOSITORIES, { fetchPolicy: 'cache-and-network', variables: filterObject})

  const fetchRepositories = async () => {
    if(data !== undefined && data.repositories !== undefined ){
        setRepositories(data.repositories);
    }
  };

  useEffect(() => {
    fetchRepositories()
  }, [data])


  return { repositories, loading };
  
  
};

export default useRepositories;