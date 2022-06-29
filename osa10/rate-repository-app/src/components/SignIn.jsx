import React from 'react'
import { Pressable, View, StyleSheet} from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { Formik, replace } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
const styles = StyleSheet.create({
  field:{
    height:60,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 12,
    margin: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
const LoginForm = ({ onSubmit}) => {

  return(
    <View>
      <FormikTextInput name = "username" placeholder = "Username"/>
      <FormikTextInput name = "password" placeholder = "Password" secureTextEntry/>
      <View style={styles.field}>
        <Pressable onPress = {onSubmit}>
          <Text fontWeight='bold' fontSize = 'subheading'> Sign in</Text>
        </Pressable>
      </View>
  </View>
  )
}

const initialValues = {
  username: '',
  password: '',
};
const SignIn = () => {
  let navigate = useNavigate();

  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate("/", { replace: true})
     
    } catch (e) {
      console.log(e);
    }
  };

  return(
    <Formik initialValues={initialValues}
     onSubmit={onSubmit}
     validationSchema = {validationSchema}
     >
      {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
    </Formik>
  )
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, 'Username too short')
    .required('Username is required'),
  password: yup
    .string()
    .min(2, 'Password too short')
    .required('Password is required'),
});

export default SignIn