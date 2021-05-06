import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Dialog from 'react-native-popup-dialog';

import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import DateItem from '../components/dateItem';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {clearLogin, restore, save} from '../models/actions';

function Main(props) {
  const navigation = useNavigation();
  const [sortPolicy, setSortPolicy] = useState('Sorted By');
  const [openSortOpt, setOpenSortOpt] = useState(false);
  const [total, setTotal] = useState(0);
  const [complete, setComplete] = useState(0);
  const [onEdit, setOnEdit] = useState(false);

  const [onAdd, setOnAdd] = useState(false);
  const [addTitle, setAddTitle] = useState('');
  const [addPriority, setAddPriority] = useState(0);
  const [addDDL, setAddDDL] = useState(new Date().getTime());
  const [openAddDateTimePicker, setOpenAddDateTimePicker] = useState(false);

  // testing data
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    props.restoreUserData({
      username: props.username,
    });
  }, [props.username]);

  useEffect(() => {
    setEventList(props.userdata);
  }, [props.userdata]);

  useEffect(() => {
    setTotal(eventList.length);
    let tempComplete = 0;
    eventList &&
      eventList.forEach(item => {
        if (item.completed) {
          tempComplete += 1;
        }
      });
    setComplete(tempComplete);
  }, [eventList]);

  const resortEvents = useCallback(
    opt => {
      if (opt === 'A-Z') {
        setEventList(
          eventList.sort((a, b) =>
            a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1,
          ),
        );
      } else if (opt === 'Z-A') {
        setEventList(
          eventList.sort((a, b) =>
            a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1,
          ),
        );
      } else if (opt === 'Priority Min') {
        setEventList(eventList.sort((a, b) => a.priority - b.priority));
      } else if (opt === 'Priority Max') {
        setEventList(eventList.sort((a, b) => b.priority - a.priority));
      }
    },
    [eventList],
  );

  return (
    <View style={styles.pageBackground}>
      <View style={styles.headRibbon}>
        <TouchableOpacity
          style={styles.sortButtonContainer}
          onPress={() => setOpenSortOpt(true)}>
          <Feather name={'filter'} size={25} color={'#000000'} />
          <Text style={styles.sortText}>{sortPolicy}</Text>
        </TouchableOpacity>
        <View style={styles.flex1} />
        <Text style={[styles.statisticText, {marginRight: 20}]}>
          total: {total}
        </Text>
        <Text style={styles.statisticText}>completed: {complete}</Text>
      </View>
      <View style={styles.colorIndicatorContainer}>
        <Text style={[styles.colorIndicator, {backgroundColor: '#2CFA1F'}]}>
          Completed
        </Text>
        <Text style={[styles.colorIndicator, {backgroundColor: '#FFCC00'}]}>
          Overdue
        </Text>
        <Text style={[styles.colorIndicator, {backgroundColor: '#E13026'}]}>
          On Going
        </Text>
      </View>
      {eventList.length > 0 && (
        <ScrollView style={styles.scrollContainer}>
          {eventList.length > 0 &&
            eventList.map((item, index) => {
              return (
                <DateItem
                  key={index}
                  completed={item.completed}
                  title={item.title}
                  priority={item.priority}
                  deadline={item.deadline}
                  onEdit={onEdit}
                  onClickComplete={() => {
                    Alert.alert('Event set as completed !');
                    let newEventList = [];
                    eventList.length > 0 &&
                      eventList.forEach((item, subIndex) => {
                        newEventList.push(
                          subIndex === index
                            ? {...item, completed: true}
                            : item,
                        );
                      });
                    setEventList(newEventList);
                  }}
                  onClickDelete={() => {
                    Alert.alert('Event deleted !');
                    let newEventList = [];
                    eventList.length > 0 &&
                      eventList.forEach((item, subIndex) => {
                        if (subIndex !== index) {
                          newEventList.push(item);
                        }
                      });
                    setEventList(newEventList);
                  }}
                  onSetPriority={newPriority => {
                    let newEventList = [];
                    eventList.length > 0 &&
                      eventList.forEach((item, subIndex) => {
                        newEventList.push(
                          subIndex === index
                            ? {...item, priority: newPriority}
                            : item,
                        );
                      });
                    setEventList(newEventList);
                  }}
                  onSetDateTime={newDateTime => {
                    let newEventList = [];
                    eventList.length > 0 &&
                      eventList.forEach((item, subIndex) => {
                        newEventList.push(
                          subIndex === index
                            ? {...item, deadline: newDateTime}
                            : item,
                        );
                      });
                    setEventList(newEventList);
                  }}
                />
              );
            })}
          {eventList.length > 0 && <View style={styles.viewPusherHeight10} />}
        </ScrollView>
      )}
      {eventList.length === 0 && (
        <View style={styles.emptyIndicatorContainer}>
          <View style={styles.flex1} />
          <View style={styles.emptyBlockContainer}>
            <Text style={styles.emptyIndicatorText}>
              Add your first item here ..
            </Text>
            <Feather name={'corner-left-down'} size={50} color={'#FFFFFF'} />
          </View>
        </View>
      )}
      <View style={styles.bottomRibbonContainer}>
        {/*Edit items*/}
        <TouchableOpacity
          style={styles.bottomRibbonButtonContainer}
          onPress={() => {
            setOnEdit(!onEdit);
            setSortPolicy('Sorted By');
            if (onEdit) {
              props.saveUserData({
                username: props.username,
                userdata: eventList,
              });
            }
          }}>
          <AntDesign
            name={'edit'}
            size={35}
            color={onEdit ? '#FF0D0D' : '#000000'}
          />
          <Text
            style={[
              styles.bottomRibbonButtonText,
              {
                color: onEdit ? '#FF0D0D' : '#000000',
              },
            ]}>
            {onEdit ? 'Confirm' : 'Edit'}
          </Text>
        </TouchableOpacity>
        {/*add new item*/}
        <TouchableOpacity
          style={[
            styles.bottomRibbonButtonContainer,
            {
              borderLeftWidth: 2,
              borderRightWidth: 2,
              borderColor: '#00000040',
            },
          ]}
          disabled={onEdit}
          onPress={() => {
            setAddTitle('');
            setAddPriority(-1);
            setAddDDL(new Date().getTime());
            setOnAdd(true);
          }}>
          <AntDesign
            name={'plus'}
            size={35}
            color={onEdit ? '#00000050' : '#000000'}
          />
          <Text
            style={[
              styles.bottomRibbonButtonText,
              {
                color: onEdit ? '#00000050' : '#000000',
              },
            ]}>
            Add New
          </Text>
        </TouchableOpacity>
        {/*log out*/}
        <TouchableOpacity
          style={styles.bottomRibbonButtonContainer}
          disabled={onEdit}
          onPress={() => {
            props.saveUserData({
              username: props.username,
              userdata: eventList,
            });
            props.clearLoginStatus();
            Alert.alert('Data saved and user logged out successfully !');
            navigation.replace('LOGIN');
          }}>
          <Feather
            name={'user-x'}
            size={35}
            color={onEdit ? '#00000050' : '#000000'}
          />
          <Text
            style={[
              styles.bottomRibbonButtonText,
              {
                color: onEdit ? '#00000050' : '#000000',
              },
            ]}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
      <Dialog visible={openSortOpt}>
        <View style={styles.sortDialogContainer}>
          <Text style={styles.sortDialogTitleText}>Select a Sort Type</Text>
          <ScrollView style={styles.scrollContainer}>
            <TouchableOpacity
              onPress={() => {
                setSortPolicy('Priority Min');
                resortEvents('Priority Min');
                setOpenSortOpt(false);
              }}>
              <Text style={styles.sortDialogSelectionText}>Priority Min</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSortPolicy('Priority Max');
                resortEvents('Priority Max');
                setOpenSortOpt(false);
              }}>
              <Text style={styles.sortDialogSelectionText}>Priority Max</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSortPolicy('A-Z');
                resortEvents('A-Z');
                setOpenSortOpt(false);
              }}>
              <Text style={styles.sortDialogSelectionText}>A-Z</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSortPolicy('Z-A');
                resortEvents('Z-A');
                setOpenSortOpt(false);
              }}>
              <Text style={styles.sortDialogSelectionText}>Z-A</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Dialog>
      <Dialog visible={onAdd}>
        <View style={styles.AddDialogContainer}>
          <Text style={styles.addDialogTitleText}>Add a New Event</Text>
          <Text style={styles.addDialogFieldText}>Type a title here:</Text>
          <TextInput
            style={styles.addDialogTextInput}
            onChangeText={setAddTitle}
          />
          <Text style={styles.addDialogFieldText}>
            Type a priority here (0-9):
          </Text>
          <TextInput
            style={styles.addDialogTextInput}
            keyboardType={'numeric'}
            onChangeText={text => setAddPriority(parseInt(text))}
          />
          <Text style={styles.addDialogFieldText}>Pick a deadline:</Text>
          <TouchableOpacity
            style={styles.addDialogTextInput}
            onPress={() => {
              setOpenAddDateTimePicker(true);
            }}>
            <Text style={styles.addDialogDateTimeText}>
              {new Date(addDDL).toLocaleDateString()}{' '}
              {new Date(addDDL).toLocaleTimeString()}
            </Text>
          </TouchableOpacity>
          <View style={styles.flex1} />
          <TouchableOpacity
            style={styles.addDialogConfirmButtonContainer}
            onPress={() => {
              if (addTitle.length > 0 && addPriority >= 0 && addPriority < 10) {
                let newEventList = [
                  {
                    title: addTitle,
                    priority: addPriority,
                    deadline: addDDL,
                    completed: false,
                  },
                ];
                eventList.length > 0 &&
                  eventList.forEach((item, subIndex) => {
                    newEventList.push(item);
                  });
                setEventList(newEventList);
                props.saveUserData({
                  username: props.username,
                  userdata: eventList,
                });
                setOnAdd(false);
              } else if (addTitle.length === 0) {
                Alert.alert('Can not add an empty-titled item');
              } else if (addPriority < 0 || addPriority >= 10) {
                Alert.alert(
                  'Not a valid priority value (0-9)',
                  'You set: ' + addPriority.toString(),
                );
              }
            }}>
            <Text style={styles.addDialogButtonText}>ADD TO MY DATES</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addDialogCancelButtonContainer}
            onPress={() => {
              setOnAdd(false);
            }}>
            <Text style={styles.addDialogButtonText}>CANCEL</Text>
          </TouchableOpacity>
          <View style={styles.flex1} />
          <DateTimePickerModal
            isVisible={openAddDateTimePicker}
            mode={'datetime'}
            date={new Date(addDDL)}
            onConfirm={datetime => {
              setAddDDL(datetime.getTime());
              setOpenAddDateTimePicker(false);
            }}
            onCancel={() => {
              setOpenAddDateTimePicker(false);
            }}
          />
        </View>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  pageBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1DA1F2',
    flexDirection: 'column',
    alignItems: 'center',
  },
  headRibbon: {
    height: 50,
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    fontSize: 15,
    color: '#000000',
    marginLeft: 10,
  },
  flex1: {
    flex: 1,
  },
  statisticText: {color: '#000000', fontSize: 15},
  colorIndicatorContainer: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorIndicator: {
    flex: 1,
    height: 30,
    color: '#000000',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  viewPusherHeight10: {
    height: 10,
  },
  emptyIndicatorContainer: {
    flex: 1,
    width: '100%',
  },
  emptyBlockContainer: {
    flexDirection: 'column',
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyIndicatorText: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  bottomRibbonContainer: {
    height: 70,
    width: '100%',
    backgroundColor: '#D3D3D3',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomRibbonButtonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  bottomRibbonButtonText: {
    fontSize: 12,
  },
  sortDialogContainer: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  sortDialogTitleText: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 40,
    fontWeight: 'bold',
  },
  sortDialogSelectionText: {
    fontSize: 18,
    color: '#000000',
    width: '100%',
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderTopWidth: 1,
    borderColor: '#00000060',
  },
  AddDialogContainer: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.6,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  addDialogTitleText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  addDialogFieldText: {
    color: '#000000',
    fontSize: 15,
    width: '80%',
    marginBottom: 5,
  },
  addDialogTextInput: {
    width: '90%',
    height: 40,
    color: '#000000',
    backgroundColor: '#D3D3D3',
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  addDialogDateTimeText: {
    height: 40,
    color: '#000000',
    textAlignVertical: 'center',
  },
  addDialogConfirmButtonContainer: {
    width: '90%',
    backgroundColor: '#1663BE',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  addDialogCancelButtonContainer: {
    width: '90%',
    backgroundColor: '#FF0D0D',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  addDialogButtonText: {
    width: '100%',
    height: 40,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 20,
  },
});

const mapStateProps = state => {
  // console.log(state);
  return {
    username: state.login?.username,
    userdata: state.db_storage?.userdata,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    clearLoginStatus: () => {
      dispatch(clearLogin());
    },
    saveUserData: params => {
      dispatch(save(params));
    },
    restoreUserData: params => {
      dispatch(restore(params));
    },
  };
};

export default connect(mapStateProps, mapDispatchToProps)(Main);
