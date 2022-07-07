import { useQuery } from '@apollo/client' 
import {  GET_REVIEWS } from '../graphql/queries'

const useReviews = (id) => {
  let variables = { repositoryId: id, first: 5}
  const {data, loading, fetchMore, refetch} = useQuery(GET_REVIEWS,{ fetchPolicy: 'cache-and-network', variables: variables })
  
  const handleFetchMore = () => {
    console.log('im HERE in review')
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REVIEWS,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    reviews: data?.repository.reviews,
    fetchMore: handleFetchMore,
    loading,
    refetch,
  };
}

export default useReviews;