import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function DateItem(props) {
  return (
    <View
      style={{
        marginHorizontal: 10,
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: props.completed ? '#CDFFCC' : '#F6BDC0',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 1,
          width: '60%',
        }}>
        {props.itemName && (
          <Text
            style={{
              color: '#000000',
              fontSize: 18,
            }}>
            {props.itemName}
          </Text>
        )}
        {props.priority && (
          <Text
            style={{
              color: '#000000',
              fontSize: 13,
            }}>
            Priority: {props.priority}
          </Text>
        )}
        {props.itemDateTime && (
          <Text
            style={{
              color: '#000000',
              fontSize: 13,
            }}>
            Deadline: {props.itemDateTime}
          </Text>
        )}
      </View>

      {props.onEdit && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {!props.completed && (
            <TouchableOpacity
              style={{
                backgroundColor: '#69B34C',
                height: 40,
                width: 40,
                borderRadius: 5,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AntDesign name={'check'} size={25} color={'#FFFFFF'} />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={{
              backgroundColor: '#FF0D0D',
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              marginLeft: 10,
            }}>
            <AntDesign name={'close'} size={25} color={'#FFFFFF'} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
