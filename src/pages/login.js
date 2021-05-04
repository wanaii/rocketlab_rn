import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {login} from '../models/actions';

function Login(props) {
  const [loginText, setLoginText] = useState('SIGNUP');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setLoginText(username === '' ? 'SIGNUP' : 'LOGIN');
  }, [username]);

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
      <TextInput
        style={{
          width: '80%',
          height: 50,
          backgroundColor: '#FFFFFF',
          borderRadius: 25,
          paddingHorizontal: 20,
          fontSize: 20,
          color: '#000000',
          alignItems: 'center',
        }}
        placeholder={'Username'}
        onChangeText={setUsername}
      />
      <TextInput
        style={{
          width: '80%',
          height: 50,
          backgroundColor: '#FFFFFF',
          marginTop: 20,
          borderRadius: 25,
          paddingHorizontal: 20,
          fontSize: 20,
          color: '#000000',
          alignItems: 'center',
        }}
        placeholder={'Password'}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
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
        onPress={() => props.pressLogin(username)}>
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
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    pressLogin: params => {
      dispatch(login(params));
    },
  };
};

export default connect(mapStateProps, mapDispatchToProps)(Login);
