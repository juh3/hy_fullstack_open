import React from 'react'
import { View, StyleSheet} from 'react-native'
import Text from '../Text'


const formatNumber = (number) => {
  if (number/1000 >1){
    let format = Math.round(number/1000*10)/10
    return format+'k'
  }else{
    return number
  }
}


const Stats = ({ item }) => {

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#FFFF',
      paddingRight: 10,
    },
    stats: {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingTop: 40
    }
  })

  return (
    <View style = {styles.container}>
      <View style = {styles.stats}>
        <Text fontWeight='bold' color='textSecondary' fontSize='subheading'>{formatNumber(item.stargazersCount)}</Text>
        <Text fontSize='subheading' color='textSecondary'>Stars</Text>
      </View>

      <View style = {styles.stats}>
        <Text fontWeight='bold' color='textSecondary' fontSize='subheading'>{formatNumber(item.forksCount)}</Text>
        <Text  fontSize='subheading' color='textSecondary'>Forks</Text>
      </View>

      <View style = {styles.stats}>
        <Text fontSize='subheading' fontWeight='bold' color='textSecondary'> {formatNumber(item.reviewCount)}</Text>
        <Text  fontSize='subheading' color='textSecondary'>Reviews</Text>
      </View>

      <View style = {styles.stats}>
        <Text fontSize='subheading' fontWeight='bold' color='textSecondary'>{formatNumber(item.ratingAverage)}</Text>
        <Text  fontSize='subheading' color='textSecondary'>Rating</Text>
      </View>

    </View>
  )
}

export default Stats