import React from 'react'
import {  View, StyleSheet, Image } from 'react-native';
import theme from '../../theme';
import Text from '../Text'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FFFF',
    paddingRight: 10,
    margin: 0,
  },

  description: {
    display: 'flex',
    flexGrow: 0,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingLeft: 10,
    paddingTop: 5
    
  },
  text: {
    color: 'blue',
    fontSize: 24,
    fontWeight: '700',
  },
});

const formatNumber = (number) => {
  if (number/1000 >1){
    return number/1000
  }
}

const Headline = ({ item }) => {
  return ( 
    <View style = {styles.container}>
      <View style = {styles.container}> 
        <Image style = {{ width: 60, height:60, borderRadius: 5}} source={{ uri:`${item.ownerAvatarUrl}`}}/>
      </View>
      <View style = {styles.description}>
        <Text color = 'textSecondary' fontWeight= 'bold' fontSize ='subheading'>{item.fullName} </Text>
        <Text color = 'textSecondary' fontSize = 'subheading'> {item.description}</Text>
        <View style = {{ flexDirection:'row'}}>
          <Text style = {{ backgroundColor: theme.colors.primary, borderRadius: 4, padding:5}} fontSize = 'subheading'> {item.language}</Text>
        </View>
      </View>
    </View>
  )
}

export default Headline;