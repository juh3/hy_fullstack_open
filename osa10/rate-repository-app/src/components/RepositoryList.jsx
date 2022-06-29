import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './Repositoryitem/RepositoryItem'
import useRepositories from '../hooks/useRepositories';
import Text from '../components/Text'
const RepositoryList = () => {
  const { repositories, loading, refetch} = useRepositories()  

  console.log(repositoryNodes)
  const ItemSeparator = () => <View style={styles.separator} />;
  const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
  });
  
  const repositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : [];

  return (
    <>
      <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem = {({ item, index, separators }) => (
        <View>
          <RepositoryItem item = {item} />
        </View>  
      )}

    />
    {loading && <Text color='textSecondary'> loading...</Text>}
    </>
  );
};

export default RepositoryList;