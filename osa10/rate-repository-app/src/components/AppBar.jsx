import { View, StyleSheet, ScrollView } from 'react-native';
import Text from './Text';
import { Link }  from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { ME } from '../graphql/queries'
import { useQuery } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundColor,
    paddingBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  tabs: {
    flexShrink: 0,
    paddingLeft: 10
  }

});

const AppBar = () => {
  const result = useQuery(ME)

  const data = result.data?.me?.id

  return (
    <View style={styles.container}>
        <ScrollView horizontal>
          <Link to ="/">
            <Text fontSize='subheading' fontWeight= 'bold' style={styles.tabs}> Repositories </Text>
          </Link>

          { data && <Link to = "/ReviewForm"> 
            <Text fontSize='subheading' fontWeight = 'bold' style={styles.tabs}>Create a review</Text>
          </Link>}

          { !data && <Link to = "/Signin" >
            <Text fontSize='subheading' fontWeight = 'bold' style={styles.tabs}>Sign in</Text>
          </Link>
          }

          {data && <Link to = "/Signout">
            <Text fontSize='subheading' fontWeight='bold' style={styles.tabs}> Sign out </Text>
          </Link>
          }

          {!data && <Link to = "/SignUp">
            <Text fontSize='subheading' fontWeight='bold' style={styles.tabs}> Sign up </Text>
          </Link>
          }
        </ScrollView>
    </View>
  );
};

export default AppBar;