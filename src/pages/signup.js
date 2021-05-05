import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
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
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#1DA1F2',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <View style={{flex: 1}} />
      <Text
        style={{
          width: '75%',
          fontSize: 15,
          color: '#FFFFFF',
        }}>
        Enter your username:
      </Text>
      <TextInput
        style={{
          width: '80%',
          height: 50,
          backgroundColor: '#FFFFFF',
          fontSize: 20,
          color: '#000000',
          borderRadius: 25,
          marginTop: 5,
          paddingHorizontal: 20,
        }}
        onChangeText={setUsername}
      />

      <Text
        style={{
          width: '75%',
          fontSize: 15,
          color: '#FFFFFF',
          marginTop: 20,
        }}>
        Enter your password:
      </Text>
      <TextInput
        style={{
          width: '80%',
          height: 50,
          backgroundColor: '#FFFFFF',
          fontSize: 20,
          color: '#000000',
          borderRadius: 25,
          marginTop: 5,
          paddingHorizontal: 20,
        }}
        secureTextEntry={true}
        onChangeText={setPassword}
      />

      <Text
        style={{
          width: '75%',
          fontSize: 15,
          color: '#FFFFFF',
          marginTop: 20,
        }}>
        Confirm your password:
      </Text>
      <TextInput
        style={{
          width: '80%',
          height: 50,
          backgroundColor: '#FFFFFF',
          fontSize: 20,
          color: '#000000',
          borderRadius: 25,
          marginTop: 5,
          paddingHorizontal: 20,
        }}
        secureTextEntry={true}
        onChangeText={setConfirmPassword}
      />

      <View style={{flex: 1}} />

      <TouchableOpacity
        style={{
          width: '80%',
          height: 50,
          backgroundColor: '#1663BE',
          marginTop: 20,
          borderRadius: 25,
          paddingHorizontal: 20,
          fontSize: 20,
        }}
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
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            width: '100%',
            height: '100%',
            textAlign: 'center',
            textAlignVertical: 'center',
            color: '#FFFFFF',
          }}>
          SIGN ME UP
        </Text>
      </TouchableOpacity>

      <View style={{flex: 2}} />
    </View>
  );
}

const mapStateProps = state => {
  console.log(state);
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
