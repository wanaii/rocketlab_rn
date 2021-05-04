import React, {useEffect, useState} from 'react';
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

function Main(props) {
  const navigation = useNavigation();
  const [sortPolicy, setSortPolicy] = useState('Sorted By');
  const [openSortOpt, setOpenSortOpt] = useState(false);
  const [total, setTotal] = useState(0);
  const [complete, setComplete] = useState(0);
  const [onEdit, setOnEdit] = useState(false);

  const pageWidth = Dimensions.get('window').width;
  const pageHeight = Dimensions.get('window').height;

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
          backgroundColor: '#D3D3D3',
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
      <ScrollView
        style={{
          flex: 1,
          width: '100%',
        }}>
        <DateItem
          completed={false}
          itemName={'123'}
          priority={9}
          itemDateTime={'31-05-2021 21:00'}
          onEdit={onEdit}
        />
        <DateItem
          completed={true}
          itemName={'123'}
          priority={9}
          itemDateTime={'31-05-2021 21:00'}
          onEdit={onEdit}
        />
      </ScrollView>
      <View
        style={{
          height: 70,
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
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderColor: '#00000040',
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
        {/*Edit items*/}
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onPress={() => setOnEdit(!onEdit)}>
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
            Edit
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
                setSortPolicy('Name Up');
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
                Name Up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSortPolicy('Name Down');
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
                Name Down
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Dialog>
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
