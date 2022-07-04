import {  StatusBar, StyleSheet, View } from 'react-native';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';
import SignOut from './SignOut';
import SingleRepository from './SingleRepositoryView';
import ReviewForm from './ReviewForm'
import SignUp from './SignUp'
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8'
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <Routes>
        <Route path = "/" element = {<RepositoryList />} exact />
        <Route path = "*" element = {<Navigate to="/" replace />} />
        <Route path = "/signin" element = {<SignIn />} exact/>
        <Route path = "/signout" element = {<SignOut />} exact/>
        <Route path = "/repository/:id" element = { <SingleRepository />} exact/>
        <Route path = "/reviewform" element = {<ReviewForm />} exact />
        <Route path = "signup" element = {<SignUp />} exact />
      </Routes>
      <StatusBar />
    </View>
  );
};

export default Main;