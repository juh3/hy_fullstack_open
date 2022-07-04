import React from 'react'
import { Pressable, View, StyleSheet} from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { Formik, replace } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

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
export const SignUpForm = ({ onSubmit}) => {

  return(
    <View>
      <FormikTextInput name = "username" placeholder = "Username"/>
      <FormikTextInput name = "password" placeholder = "Password" secureTextEntry/>
      <FormikTextInput name = "passwordConfirm" placeholder = "Password confirmation" secureTextEntry/>
      <View style={styles.field}>
        <Pressable onPress = {onSubmit}>
          <Text fontWeight='bold' fontSize = 'subheading'> Sign up</Text>
        </Pressable>
      </View>
  </View>
  )
}

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};
const SignUp = () => {
  let navigate = useNavigate();
  const [signUp] = useMutation(CREATE_USER)
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signUp({ variables: {user: { username, password }}});
      await signIn({ username, password });
      navigate("/", { replace: true})
      console.log(data)
      
     
    } catch (e) {
      console.log(e);
    }
  };

  return(
    <Formik initialValues={initialValues}
     onSubmit={onSubmit}
     validationSchema = {validationSchema}
     >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username too short')
    .max(30, 'Username too long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password too short')
    .max(50,'Password too long')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password is required')
});

export default SignUp