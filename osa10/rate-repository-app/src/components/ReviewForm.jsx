import React from 'react'
import { Text, StyleSheet, View, Pressable } from 'react-native'
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
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

export const Review = ({ onSubmit}) => {

  return(
    <View>
      <FormikTextInput name = "ownerName" placeholder = "Repository owner name"/>
      <FormikTextInput name = "repositoryName" placeholder = "Repository name"/>
      <FormikTextInput name = "rating" placeholder = "Rating between 0 and 100"/>
      <FormikTextInput name = "text" placeholder = "Review"/>
      <View style={styles.field}>
        <Pressable onPress = {onSubmit}>
          <Text fontWeight='bold' fontSize = 'subheading'> Create a review</Text>
        </Pressable>
      </View>
  </View>
  )
}

const ReviewForm = () => {

  let navigate = useNavigate()
  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: ''
  }

  const [review, result ] = useMutation(CREATE_REVIEW)
  const onSubmit = async ( values ) => {
    let { ownerName, repositoryName, rating, text} = values
    rating = parseInt(rating)
    try {
   
      const { data } = await review({ variables: {review: { ownerName, repositoryName, rating, text}}});
      const repositoryId = data.createReview.repositoryId
      navigate(`/repository/${repositoryId}`, { replace: true})
    } catch (e) {
      console.log(e);
    }
  };
    
  

  return (
      <Formik initialValues={initialValues}
       onSubmit={onSubmit}
       validationSchema = {validationSchema}
       >
        {({ handleSubmit }) => <Review onSubmit={handleSubmit} />}
      </Formik>
    )
  
}

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(0)
    .max(100)
    .required('Rating is required'),
  text: yup
    .string()
});
export default ReviewForm