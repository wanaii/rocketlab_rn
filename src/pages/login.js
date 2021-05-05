import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {connect} from 'react-redux';
import {login, clearLogin} from '../models/actions';
import {useNavigation} from '@react-navigation/native';

function Login(props) {
  const [loginText, setLoginText] = useState('SIGN ME UP');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    setLoginText(username === '' ? 'SIGN ME UP' : 'LOGIN');
  }, [username]);

  useEffect(() => {
    if (props.isLoggedIn === false) {
      Alert.alert('User Login Failed', 'Please Try Again or Register');
      props.clearLoginStatus();
    } else if (props.isLoggedIn === true) {
      Alert.alert('Logged In Successfully !', 'Welcome ' + username);
      navigation.replace('MAIN');
    }
  }, [navigation, props, props.isLoggedIn, username]);

  return (
    <View
      style={{
        backgroundColor: '#1DA1F2',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <View style={{flex: 1}} />
      <Text
        style={{
          fontSize: 60,
          fontWeight: 'bold',
          color: '#FFFFFF',
        }}>
        My Dates
      </Text>
      <View style={{flex: 1}} />
      <View
        style={{
          width: '80%',
          height: 50,
          backgroundColor: '#FFFFFF',
          borderRadius: 25,
          paddingHorizontal: 20,
          fontSize: 20,
          color: '#000000',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontSize: 20,
            color: '#00000080',
            height: 50,
            textAlignVertical: 'center',
          }}>
          name:
        </Text>
        <TextInput
          style={{
            flex: 1,
            marginLeft: 10,
            height: 50,
            fontSize: 20,
            color: '#000000',
          }}
          onChangeText={setUsername}
        />
      </View>

      <View
        style={{
          marginTop: 20,
          width: '80%',
          height: 50,
          backgroundColor: '#FFFFFF',
          borderRadius: 25,
          paddingHorizontal: 20,
          fontSize: 20,
          color: '#000000',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontSize: 20,
            color: '#00000080',
            height: 50,
            textAlignVertical: 'center',
          }}>
          pwd:
        </Text>
        <TextInput
          style={{
            flex: 1,
            marginLeft: 10,
            height: 50,
            fontSize: 20,
            color: '#000000',
          }}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
      </View>

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
          if (username !== '') {
            props.pressLogin({username, password});
          } else {
            navigation.navigate('SIGNUP');
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
          {loginText}
        </Text>
      </TouchableOpacity>
      <View style={{flex: 2}} />
    </View>
  );
}

const mapStateProps = state => {
  // console.log(state);
  return {
    isLoggedIn: state.login?.logged_in,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    pressLogin: params => {
      dispatch(login(params));
    },
    clearLoginStatus: () => {
      dispatch(clearLogin());
    },
  };
};

export default connect(mapStateProps, mapDispatchToProps)(Login);
