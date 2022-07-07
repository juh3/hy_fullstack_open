import REACT from 'react'
import { useParams } from 'react-router-native'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORY, GET_REVIEWS } from '../graphql/queries'
import RepositoryItem from './Repositoryitem/RepositoryItem'
import { View, FlatList, StyleSheet } from 'react-native'
import theme from '../theme'
import Text from '../components/Text'
import { format } from 'date-fns'
import useReviews from '../hooks/useReviews'

const SingleRepositoryView = ({ repository}) => {
  return(
    <View>
      <RepositoryItem item = {repository} />
    </View>  
  )
}

const ReviewItem = ({ review }) => {

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFFF",
      display: 'flex',
      marginTop: 10,
      flexDirection: 'row'

    },

    wrapper: {
      paddingLeft: 10,
      paddingTop: 10,
      flexShrink: 1,
      paddingBottom: 15
    },

    text: {
      justifyContent: 'space-around'
    },

    rating: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderColor: theme.colors.primary,
      justifyContent: 'space-around',
      alignItems: 'center',
      borderWidth: 2,
    }
  })

  const date  = format( new Date(review.createdAt), 'dd.MM.yyyy')
  return(
    <View style = {styles.container}>
      <View style = {styles.wrapper}>
        <View style = {styles.rating}>
          <Text fontWeight = 'bold' color = 'primary' fontSize='subheading'> {review.rating}</Text>
        </View>
      </View>
      <View style = {styles.wrapper}>
        <View style = {styles.text}>
          <Text fontWeight='bold' color = 'textSecondary'> {review.user.username}</Text>
          <Text color = 'textSecondary'> {date}</Text>
          <Text color = 'textSecondary'> {review.text}</Text>
        </View>
      </View>
    </View>
 )
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator}/>;

export class SingleRepoContainer extends REACT.Component {
  renderHeader = () => {
    const props = this.props
    return(
      <View>
        <SingleRepositoryView repository={props.repository} />
      </View>
    )
  }
  render(){
    const reviewNodes = this.props.reviews
    ? this.props.reviews.edges.map((edge) => edge.node)
    : [];

  return(
    <FlatList
        data={reviewNodes}
        ItemSeparatorComponent= {ItemSeparator}
        ListHeaderComponent = {this.renderHeader}
        renderItem = {({ item }) => 
          <ReviewItem review={item} />
        }
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
  )
}
}
const SingleRepository = () => {
  const { id } = useParams()
  const { reviews, fetchMore } = useReviews(id)
  const result = useQuery(GET_REPOSITORY, { fetchPolicy: 'cache-and-network', variables: {repositoryId:id}})
  if(result.loading) {
    return(
      <Text> Loading ...</Text>
    )
  }
  const onEndReach = () => {
    fetchMore()
  }

  return (
    <SingleRepoContainer 
      repository = {result.data.repository} 
      reviews = {reviews} 
      onEndReach = {onEndReach} />
  );
};

export default SingleRepository;