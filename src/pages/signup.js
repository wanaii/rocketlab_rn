import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {connect} from 'react-redux';

function Signup(props) {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#1DA1F2',
      }}
    />
  );
}

const mapStateProps = state => {
  console.log(state);
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(mapStateProps, mapDispatchToProps)(Signup);
