import React from 'react'
import {  View, Text, StyleSheet } from 'react-native';
import Headline from './Headline';
import Stats from './Stats';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFF'
  },
  text: {
    color: 'blue',
    fontSize: 24,
    fontWeight: '700',
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style = {styles.container}>
      <Headline item = {item} />
      <Stats item = {item} />
    </View>
  )
}

export default RepositoryItem;