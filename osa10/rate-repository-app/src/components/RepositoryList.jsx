import { FlatList, View, Pressable, StyleSheet, TextInput } from 'react-native';
import RepositoryItem from './Repositoryitem/RepositoryItem'
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import REACT, { useCallback, useState } from 'react';
import { Picker } from '@react-native-picker/picker'
import { useDebounce } from 'use-debounce'


const SearchTab = ({ setKeyword}) => {
 
  return(
    <TextInput
      onChangeText={(text) => setKeyword(text)}
      placeholder = 'Filter by username'
    />
  )
}

const FilterPicker = ({ filter, setFilter}) => {
  return(
    <Picker
      selectedValue={filter}
      onValueChange={(itemValue, itemIndex) =>
        setFilter(itemValue)
      }>
      <Picker.Item label="latest" value="CREATED_AT" />
      <Picker.Item label="highest to lowest" value="DESC" />
      <Picker.Item label="lowest to highest" value="ASC" />
    </Picker>
  );
};
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});
const ItemSeparator = () => <View style={styles.separator}/>;

export class RepositoryListContainer extends REACT.Component {
  renderHeader = () => {
    const props = this.props
    return(
      <View>
        <SearchTab  setKeyword = {props.setKeyword}/>
        <FilterPicker filter = {props.filter} setFilter = {props.setFilter}/>
      </View>
    )
  }
  render(){

    const repositoryNodes = this.props.repositories
      ? this.props.repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent= {ItemSeparator}
        ListHeaderComponent = {this.renderHeader}
        renderItem = {({ item }) => 
          <IdPressable item = {item} />
        }
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    )
}}

const IdPressable = ({ item }) => {
  let navigate = useNavigate()

  const onPressFunction =  useCallback(() => {
    navigate(`/repository/${item.id}`);
  }, [item]);
    
  return(
    <View>
      <Pressable onPress={() => {onPressFunction(item.id)}}>
        <RepositoryItem item = {item} />
      </Pressable>
    </View>
  )
}
const RepositoryList = () => {
  const [filter, setFilter ] = useState("CREATED_AT")
  const [ keyword, setKeyword] = useState("")
  const [keywordValue] = useDebounce(keyword, 500)

  const { repositories, fetchMore } = useRepositories(filter, keywordValue)
  const onEndReach = () => {
    fetchMore()
  }

  return <RepositoryListContainer 
    repositories={repositories} 
    filter = {filter} 
    setFilter = {setFilter} 
    setKeyword = {setKeyword} 
    onEndReach = {onEndReach}  
  />;
};

export default RepositoryList;