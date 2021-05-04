import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

import {Icon} from '@ant-design/react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {connect} from 'react-redux';
import {clearSignup, signup} from '../models/actions';
import {useNavigation} from '@react-navigation/native';

function Main(props) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#1DA1F2',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <ScrollView
        style={{
          flex: 1,
          width: '100%',
        }}
      />

      <View
        style={{
          height: 60,
          width: '100%',
          backgroundColor: '#D3D3D3',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {/*dates list*/}
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <AntDesign name={'calendar'} size={35} color={'#000000'} />
          <Text
            style={{
              fontSize: 12,
              color: '#000000',
            }}>
            My Dates
          </Text>
        </TouchableOpacity>
        {/*add new item*/}
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <AntDesign name={'plus'} size={35} color={'#000000'} />
          <Text
            style={{
              fontSize: 12,
              color: '#000000',
            }}>
            Add New
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const mapStateProps = state => {
  console.log(state);
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(mapStateProps, mapDispatchToProps)(Main);
