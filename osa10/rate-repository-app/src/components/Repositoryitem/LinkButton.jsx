import React from 'react'
import { Button, Linking, View, StyleSheet} from 'react-native'
const LinkButton = ({ url }) => {
  console.log('im here', url)
  const styles = StyleSheet.create({
    wrapper:{
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    button: {
      width: 100
    }
  })

  const onPress = () => {
    Linking.openURL(url)
  }

  return (
    <View style = {styles.wrapper}>
      <Button style = {styles.button} title='Open in GitHub' onPress={() => onPress()}/>
    </View>
  )
}

export default LinkButton