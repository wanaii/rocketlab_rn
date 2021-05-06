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
    <View style={styles.pageBackground}>
      <View style={styles.flex1} />
      <Text style={styles.nameText}>My Dates</Text>
      <View style={styles.flex1} />
      <View style={styles.inputBackground}>
        <Text style={styles.inputIndicatorText}>name:</Text>
        <TextInput style={styles.inputText} onChangeText={setUsername} />
      </View>

      <View style={[styles.inputBackground, {marginTop: 20}]}>
        <Text style={styles.inputIndicatorText}>pwd:</Text>
        <TextInput
          style={styles.inputText}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.flex1} />

      <TouchableOpacity
        style={styles.buttonTouchableBackground}
        onPress={() => {
          if (username !== '') {
            props.pressLogin({username, password});
          } else {
            navigation.navigate('SIGNUP');
          }
        }}>
        <Text style={styles.buttonText}>{loginText}</Text>
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
  nameText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  inputBackground: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 20,
    color: '#000000',
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputIndicatorText: {
    fontSize: 20,
    color: '#00000080',
    height: 50,
    textAlignVertical: 'center',
  },
  inputText: {
    flex: 1,
    marginLeft: 10,
    height: 50,
    fontSize: 20,
    color: '#000000',
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
