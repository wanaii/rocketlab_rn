import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
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

  const pageWidth = Dimensions.get('window').width;
  const pageHeight = Dimensions.get('window').height;

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
      } else if (opt === 'Priority Up') {
        setEventList(eventList.sort((a, b) => a.priority - b.priority));
      } else if (opt === 'Priority Down') {
        setEventList(eventList.sort((a, b) => b.priority - a.priority));
      }
    },
    [eventList],
  );

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#1DA1F2',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: 50,
          width: '100%',
          backgroundColor: '#FFFFFF',
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => setOpenSortOpt(true)}>
          <Feather name={'filter'} size={25} color={'#000000'} />
          <Text
            style={{
              fontSize: 15,
              color: '#000000',
              marginLeft: 10,
            }}>
            {sortPolicy}
          </Text>
        </TouchableOpacity>
        <View style={{flex: 1}} />
        <Text style={{color: '#000000', fontSize: 15, marginRight: 20}}>
          total: {total}
        </Text>
        <Text style={{color: '#000000', fontSize: 15}}>
          completed: {complete}
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          height: 30,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            flex: 1,
            height: 30,
            backgroundColor: '#2CFA1F',
            color: '#000000',
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          Completed
        </Text>
        <Text
          style={{
            flex: 1,
            height: 30,
            backgroundColor: '#FFCC00',
            color: '#000000',
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          Overdue
        </Text>
        <Text
          style={{
            flex: 1,
            height: 30,
            backgroundColor: '#E13026',
            color: '#000000',
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          On Going
        </Text>
      </View>
      {eventList.length > 0 && (
        <ScrollView
          style={{
            flex: 1,
            width: '100%',
          }}>
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
                    Alert.alert('Completed');
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
                    Alert.alert('Deleted');
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
          {eventList.length > 0 && (
            <View
              style={{
                height: 10,
              }}
            />
          )}
        </ScrollView>
      )}
      {eventList.length === 0 && (
        <View
          style={{
            flex: 1,
            width: '100%',
          }}>
          <View style={{flex: 1}} />
          <View
            style={{
              flexDirection: 'column',
              paddingVertical: 20,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                color: '#FFFFFF',
                marginBottom: 20,
              }}>
              Add your first item here ..
            </Text>
            <Feather name={'corner-left-down'} size={50} color={'#FFFFFF'} />
          </View>
        </View>
      )}

      <View
        style={{
          height: 70,
          width: '100%',
          backgroundColor: '#D3D3D3',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {/*Edit items*/}
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onPress={() => {
            setOnEdit(!onEdit);
            setSortPolicy('Sorted By');
          }}>
          <AntDesign
            name={'edit'}
            size={35}
            color={onEdit ? '#FF0D0D' : '#000000'}
          />
          <Text
            style={{
              fontSize: 12,
              color: onEdit ? '#FF0D0D' : '#000000',
            }}>
            {onEdit ? 'Confirm' : 'Edit'}
          </Text>
        </TouchableOpacity>
        {/*add new item*/}
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderColor: '#00000040',
          }}
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
            style={{
              fontSize: 12,
              color: onEdit ? '#00000050' : '#000000',
            }}>
            Add New
          </Text>
        </TouchableOpacity>
        {/*log out*/}
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
          }}
          disabled={onEdit}
          onPress={() => {
            props.saveUserData({
              username: props.username,
              userdata: eventList,
            });
            props.clearLoginStatus();
            Alert.alert('Data Saved and User Logged Out Successfully !');
            navigation.replace('LOGIN');
          }}>
          <Feather
            name={'user-x'}
            size={35}
            color={onEdit ? '#00000050' : '#000000'}
          />
          <Text
            style={{
              fontSize: 12,
              color: onEdit ? '#00000050' : '#000000',
            }}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
      <Dialog visible={openSortOpt}>
        <View
          style={{
            width: pageWidth * 0.6,
            height: pageHeight * 0.4,
            backgroundColor: '#FFFFFF',
            borderRadius: 5,
            flexDirection: 'column',
            alignItems: 'center',
            padding: 20,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: '#000000',
              marginBottom: 40,
              fontWeight: 'bold',
            }}>
            Select a Sort Type
          </Text>
          <ScrollView
            style={{
              flex: 1,
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                setSortPolicy('Priority Up');
                resortEvents('Priority Up');
                setOpenSortOpt(false);
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#000000',
                  width: '100%',
                  height: 50,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  borderTopWidth: 1,
                  borderColor: '#00000060',
                }}>
                Priority Up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSortPolicy('Priority Down');
                resortEvents('Priority Down');
                setOpenSortOpt(false);
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#000000',
                  width: '100%',
                  height: 50,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  borderTopWidth: 1,
                  borderColor: '#00000060',
                }}>
                Priority Down
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSortPolicy('A-Z');
                resortEvents('A-Z');
                setOpenSortOpt(false);
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#000000',
                  width: '100%',
                  height: 50,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  borderTopWidth: 1,
                  borderColor: '#00000060',
                }}>
                A-Z
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSortPolicy('Z-A');
                resortEvents('Z-A');
                setOpenSortOpt(false);
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#000000',
                  width: '100%',
                  height: 50,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  borderTopWidth: 1,
                  borderColor: '#00000060',
                }}>
                Z-A
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Dialog>
      <Dialog visible={onAdd}>
        <View
          style={{
            width: pageWidth * 0.8,
            height: pageHeight * 0.6,
            backgroundColor: '#FFFFFF',
            borderRadius: 5,
            flexDirection: 'column',
            alignItems: 'center',
            padding: 20,
          }}>
          <Text
            style={{
              color: '#000000',
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 40,
            }}>
            Add a New Event
          </Text>
          <Text
            style={{
              color: '#000000',
              fontSize: 15,
              width: '80%',
              marginBottom: 5,
            }}>
            Type a title here:
          </Text>
          <TextInput
            style={{
              width: '90%',
              height: 40,
              color: '#000000',
              backgroundColor: '#D3D3D3',
              borderRadius: 20,
              marginBottom: 10,
              paddingHorizontal: 20,
            }}
            onChangeText={setAddTitle}
          />
          <Text
            style={{
              color: '#000000',
              fontSize: 15,
              width: '80%',
              marginBottom: 5,
            }}>
            Type a priority here (0-9):
          </Text>
          <TextInput
            style={{
              width: '90%',
              height: 40,
              color: '#000000',
              backgroundColor: '#D3D3D3',
              borderRadius: 20,
              marginBottom: 10,
              paddingHorizontal: 20,
            }}
            keyboardType={'numeric'}
            onChangeText={text => setAddPriority(parseInt(text))}
          />
          <Text
            style={{
              color: '#000000',
              fontSize: 15,
              width: '80%',
              marginBottom: 5,
            }}>
            Pick a deadline:
          </Text>
          <TouchableOpacity
            style={{
              width: '90%',
              backgroundColor: '#D3D3D3',
              borderRadius: 20,
              marginBottom: 10,
              paddingHorizontal: 20,
            }}
            onPress={() => {
              setOpenAddDateTimePicker(true);
            }}>
            <Text
              style={{
                height: 40,
                color: '#000000',
                textAlignVertical: 'center',
              }}>
              {new Date(addDDL).toLocaleDateString()}{' '}
              {new Date(addDDL).toLocaleTimeString()}
            </Text>
          </TouchableOpacity>
          <View style={{flex: 1}} />
          <TouchableOpacity
            style={{
              width: '90%',
              backgroundColor: '#1663BE',
              borderRadius: 20,
              paddingHorizontal: 20,
            }}
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
            <Text
              style={{
                width: '100%',
                height: 40,
                color: '#FFFFFF',
                fontWeight: 'bold',
                textAlignVertical: 'center',
                textAlign: 'center',
                fontSize: 20,
              }}>
              ADD TO MY DATES
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#FF0D0D',
              width: '90%',
              borderRadius: 20,
              paddingHorizontal: 20,
              marginTop: 10,
            }}
            onPress={() => {
              setOnAdd(false);
            }}>
            <Text
              style={{
                fontSize: 20,
                height: 40,
                fontWeight: 'bold',
                color: '#FFFFFF',
                textAlignVertical: 'center',
                textAlign: 'center',
              }}>
              CANCEL
            </Text>
          </TouchableOpacity>
          <View style={{flex: 1}} />
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
