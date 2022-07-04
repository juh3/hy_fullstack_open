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
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingLeft: 1,
    paddingTop: 5,
    flexShrink: 1,

    
  },
  text: {
    color: 'blue',
    fontSize: 24,
    fontWeight: '700',
  },
});

const Headline = ({ item }) => {
  return ( 
    <View style = {styles.container}>
      <View style = {styles.container}> 
        <Image style = {{ width: 50, height:50, borderRadius: 5}} source={{ uri:`${item.ownerAvatarUrl}`}}/>
      </View>
      <View style = {styles.description}>
        <Text testID = "fullName" color = 'textSecondary' fontWeight= 'bold' fontSize ='subheading'>{item.fullName} </Text>
        <Text testID = "description" color = 'textSecondary' fontSize = 'subheading'> {item.description}</Text>
        <View style = {{ flexDirection:'row'}}>
          <Text testID = "language" style = {{ backgroundColor: theme.colors.primary, borderRadius: 4, padding:5}} fontSize = 'subheading'> {item.language}</Text>
        </View>
      </View>
    </View>
  )
}

export default Headline;