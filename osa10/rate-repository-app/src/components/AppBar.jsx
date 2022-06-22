import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundColor,
    paddingBottom: 30
  },
  // ...
});

const AppBar = () => {

  const onPressFunction = () => {
    console.log('pressed repositories')
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={onPressFunction}> 
        <Text fontSize='subheading' fontWeight= 'bold'> Repositories</Text> 
      </Pressable>
    </View>
  );
};

export default AppBar;