import { View, StyleSheet, ScrollView } from 'react-native';
import Text from './Text';
import { Link }  from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';
import SignIn from './SignIn';
import { ME } from '../graphql/queries'
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
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
  const result = useQuery(ME)

  const data = result.data?.me?.id

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to ="/">
          <Text fontSize='subheading' fontWeight= 'bold'> Repositories </Text>
        </Link>

        { !data && <Link to = "/Signin" >
          <Text fontSize='subheading' fontWeight = 'bold'>Sign in</Text>
        </Link>
        }

        {data && <Link to = "/Signout">
          <Text fontSize='subheading' fontWeight='bold'> Sign out </Text>
        </Link>
        }
      </ScrollView>

    </View>
  );
};

export default AppBar;