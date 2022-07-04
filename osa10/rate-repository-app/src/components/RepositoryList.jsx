import { FlatList, View, Pressable, StyleSheet } from 'react-native';
import RepositoryItem from './Repositoryitem/RepositoryItem'
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { useCallback, useState } from 'react';
import {  Button, Menu, Divider, Provider } from 'react-native-paper';

export const RepositoryListContainer = ({ repositories }) => {

  const [visible , setVisible] = useState(false)
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const FilterPicker = () => {
    return(
    <Provider>
      <View
        style={{
          paddingTop: 50,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Show menu</Button>}>
          <Menu.Item leadingIcon="redo" onPress={() => {}} title="Redo" />
          <Menu.Item leadingIcon="undo" onPress={() => {}} title="Undo" />
          <Menu.Item leadingIcon="content-cut" onPress={() => {}} title="Cut" disabled />
          <Menu.Item leadingIcon="content-copy" onPress={() => {}} title="Copy" disabled />
          <Menu.Item leadingIcon="content-paste" onPress={() => {}} title="Paste" />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
      </View>
    </Provider>
    );
  };

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  
  const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
  });

  const ItemSeparator = () => <View style={styles.separator}/>;


  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent= {ItemSeparator}
      ListHeaderComponent = {<FilterPicker />}
      renderItem = {({ item }) => 
        <IdPressable item = {item} />
      }
      />
  )
}

const IdPressable = ({ item }) => {
  let navigate = useNavigate()

  const onPressFunction =  useCallback(() => {
    navigate(`/repository/${item.id}`);
  }, [item]);
    

  console.log(item, 'item')
  console.log(item.id, 'item id')
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
  console.log(filter)
  const { repositories } = useRepositories(filter)
  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;