import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  field:{
    height:60,
    borderColor: 'gray',
    borderWidth: 2,
    padding: 12,
    margin: 12,
    borderRadius: 5
  },

  field_error:{
    height:60,
    borderColor: '#d73a4a',
    borderWidth: 2,
    padding: 12,
    margin: 12,
    borderRadius: 5
  }
});

const TextInput = ({ style, error, ...props }) => {
  
  const textInputStyle = error ? styles.field_error : styles.field

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;