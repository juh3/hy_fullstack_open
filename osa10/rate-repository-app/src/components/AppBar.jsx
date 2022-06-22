import { View, StyleSheet, ScrollView } from 'react-native';
import Text from './Text';
import { Link }  from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundColor,
    paddingBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

});

const AppBar = () => {

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to ="/">
          <Text fontSize='subheading' fontWeight= 'bold'> Repositories </Text>
        </Link>

        <Link to = "/Signin" >
          <Text fontSize='subheading' fontWeight = 'bold'>Sign in</Text>
        </Link>
      </ScrollView>

    </View>
  );
};

export default AppBar;