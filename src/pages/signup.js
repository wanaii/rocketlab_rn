import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {clearSignup, signup} from '../models/actions';
import {useNavigation} from '@react-navigation/native';

function Signup(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(password);

  const navigation = useNavigation();

  useEffect(() => {
    if (props.isSignedUp === true) {
      Alert.alert('Sign Up Successfully');
      props.clearSignUp();
      navigation.goBack();
    } else if (props.isSignedUp === false) {
      Alert.alert('Sign Up Failed', 'The username may have already existed');
      props.clearSignUp();
    }
  }, [navigation, props]);

  return (
    <View style={styles.pageBackground}>
      <View style={styles.flex1} />
      <Text style={styles.inputFieldText}>Enter your username:</Text>
      <TextInput style={styles.inputText} onChangeText={setUsername} />

      <Text style={[styles.inputFieldText, {marginTop: 20}]}>
        Enter your password:
      </Text>
      <TextInput
        style={styles.inputText}
        secureTextEntry={true}
        onChangeText={setPassword}
      />

      <Text style={[styles.inputFieldText, {marginTop: 20}]}>
        Confirm your password:
      </Text>
      <TextInput
        style={styles.inputText}
        secureTextEntry={true}
        onChangeText={setConfirmPassword}
      />

      <View style={styles.flex1} />

      <TouchableOpacity
        style={styles.buttonTouchableBackground}
        onPress={() => {
          if (username.length === 0) {
            Alert.alert('Username can not be empty');
          } else if (password !== confirmPassword) {
            Alert.alert('Password mismatched', 'Please check values assigned');
          } else {
            props.onSignUp({
              username,
              password,
            });
          }
        }}>
        <Text style={styles.buttonText}>SIGN ME UP</Text>
      </TouchableOpacity>

      <View style={styles.flex2} />
    </View>
  );
}

const styles = StyleSheet.create({
  pageBackground: {
    backgroundColor: '#1DA1F2',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  inputFieldText: {
    width: '75%',
    fontSize: 15,
    color: '#FFFFFF',
  },
  inputText: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFFFFF',
    fontSize: 20,
    color: '#000000',
    borderRadius: 25,
    marginTop: 5,
    paddingHorizontal: 20,
  },
  buttonTouchableBackground: {
    width: '80%',
    height: 50,
    backgroundColor: '#1663BE',
    marginTop: 20,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 20,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FFFFFF',
  },
});

const mapStateProps = state => {
  return {
    isSignedUp: state.signup?.signed_up,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSignUp: params => {
      dispatch(signup(params));
    },
    clearSignUp: () => {
      dispatch(clearSignup());
    },
  };
};

export default connect(mapStateProps, mapDispatchToProps)(Signup);
