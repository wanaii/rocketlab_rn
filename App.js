import React from 'react';
import type {Node} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {connect} from 'react-redux';
import Login from './src/pages/login';
import Signup from './src/pages/signup';
import Main from './src/pages/main';

const Stack = createStackNavigator();

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator headerShown={false}>
          <Stack.Screen
            name="LOGIN"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SIGNUP"
            component={Signup}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="MAIN"
            component={Main}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const mapStateProps = state => {
  console.log('++++++++++++++++++++++++');
  console.log(state);
  console.log('++++++++++++++++++++++++');
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(mapStateProps, mapDispatchToProps)(App);
