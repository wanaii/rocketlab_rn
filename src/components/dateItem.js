import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
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
      style={[
        styles.itemContainer,
        {
          borderLeftColor: props.completed
            ? '#2CFA1F'
            : new Date().getTime() > deadline && !props.completed
            ? '#FFCC00'
            : '#E13026',
        },
      ]}>
      <View style={styles.itemInfoContainer}>
        {props.title && <Text style={styles.itemTitleText}>{props.title}</Text>}
        {props.priority !== undefined && (
          <View style={styles.rowCenterContainer}>
            <Text
              style={{
                color: '#000000',
                fontSize: props.onEdit ? 15 : 13,
              }}>
              Priority:{' '}
            </Text>
            {props.onEdit && (
              <TouchableOpacity
                onPress={() => {
                  if (priority < 9) {
                    setPriority(priority + 1);
                    props.onSetPriority(priority + 1);
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
                    props.onSetPriority(priority - 1);
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
        <View style={styles.rowCenterContainer}>
          {!props.completed && (
            <TouchableOpacity
              style={[
                {
                  backgroundColor: '#2CFA1F',
                },
                styles.editButtonContainer,
              ]}
              onPress={props.onClickComplete}>
              <AntDesign name={'check'} size={25} color={'#FFFFFF'} />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              {
                backgroundColor: '#FF0D0D',
                marginLeft: 10,
              },
              styles.editButtonContainer,
            ]}
            onPress={props.onClickDelete}>
            <AntDesign name={'delete'} size={25} color={'#FFFFFF'} />
          </TouchableOpacity>
        </View>
      )}
      <DateTimePickerModal
        isVisible={openDateTimePicker}
        mode={'datetime'}
        date={new Date(deadline)}
        onConfirm={datetime => {
          setDeadline(datetime.getTime());
          props.onSetDateTime(datetime.getTime());
          setOpenDateTimePicker(false);
        }}
        onCancel={() => {
          setOpenDateTimePicker(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemInfoContainer: {
    flex: 1,
    width: '60%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  itemTitleText: {
    color: '#000000',
    fontSize: 18,
  },
  rowCenterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonContainer: {
    height: 40,
    width: 40,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
