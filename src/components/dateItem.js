import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function DateItem(props) {
  const [priority, setPriority] = useState(props.priority);
  const [deadline, setDeadline] = useState(props.deadline);
  const [openDateTimePicker, setOpenDateTimePicker] = useState(false);

  useEffect(() => {
    setPriority(props.priority);
  }, [props.priority]);

  useEffect(() => {
    setDeadline(props.deadline);
  }, [props.deadline]);

  return (
    <View
      style={{
        marginHorizontal: 10,
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        borderLeftColor: props.completed
          ? '#2CFA1F'
          : new Date().getTime() > deadline && !props.completed
          ? '#FFCC00'
          : '#E13026',
        borderLeftWidth: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 1,
          width: '60%',
        }}>
        {props.title && (
          <Text
            style={{
              color: '#000000',
              fontSize: 18,
            }}>
            {props.title}
          </Text>
        )}
        {props.priority && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: props.onEdit ? '#FF0D0D' : '#000000',
                fontSize: props.onEdit ? 15 : 13,
              }}>
              Priority:{' '}
            </Text>
            {props.onEdit && (
              <TouchableOpacity
                onPress={() => {
                  if (priority < 9) {
                    setPriority(priority + 1);
                  }
                }}>
                <AntDesign
                  name={'pluscircle'}
                  size={20}
                  color={priority === 9 ? '#9A9A9A' : '#69B34C'}
                />
              </TouchableOpacity>
            )}
            <Text
              style={{
                color: props.onEdit ? '#FF0D0D' : '#000000',
                fontSize: props.onEdit ? 18 : 13,
                fontWeight: props.onEdit ? 'bold' : 'normal',
                marginHorizontal: props.onEdit ? 10 : 0,
              }}>
              {priority}
            </Text>
            {props.onEdit && (
              <TouchableOpacity
                onPress={() => {
                  if (priority > 0) {
                    setPriority(priority - 1);
                  }
                }}>
                <AntDesign
                  name={'minuscircle'}
                  size={20}
                  color={priority === 0 ? '#9A9A9A' : '#FF0D0D'}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
        {props.deadline && (
          <TouchableOpacity
            disabled={!props.onEdit}
            onPress={() => setOpenDateTimePicker(true)}>
            <Text
              style={{
                color: props.onEdit ? '#FF0D0D' : '#000000',
                fontSize: props.onEdit ? 15 : 13,
              }}>
              Deadline: {new Date(deadline).toLocaleDateString()}{' '}
              {new Date(deadline).toLocaleTimeString()}
            </Text>
          </TouchableOpacity>
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
                borderRadius: 10,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={props.onClickComplete}>
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
              borderRadius: 10,
              marginLeft: 10,
            }}
            onPress={props.onClickDelete}>
            <AntDesign name={'close'} size={25} color={'#FFFFFF'} />
          </TouchableOpacity>
        </View>
      )}
      <DateTimePickerModal
        isVisible={openDateTimePicker}
        mode={'datetime'}
        date={new Date(deadline)}
        onConfirm={datetime => {
          setDeadline(datetime.getTime());
          setOpenDateTimePicker(false);
        }}
        onCancel={() => {
          setOpenDateTimePicker(false);
        }}
      />
    </View>
  );
}
