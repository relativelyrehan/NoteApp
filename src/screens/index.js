import React, {useState, useEffect} from 'react';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import {
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import Dialog from 'react-native-dialog';
import axios from 'axios';

import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {setNotes} from '../../redux/actions/notes';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import icon from '../assets/images/upload.png';
import Layout from '../components/Layout/index';
import Heading from '../components/UI/Heading';
const MainPage = ({navigation}) => {
  const [permissions, setPermissions] = useState({});
  const allNotes = useSelector(state => state.allNotes);
  const dispatch = useDispatch();
  const [notes, setNewNotes] = useState([]);
  const [note, setNote] = useState('');
  const [show, setShow] = useState(false);
  const [val, setVal] = useState({});
  const [store, setStore] = useState();
  const [memNotes, setMemNotes] = useState([]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      const notesFromMemory = await AsyncStorage.getItem('@stored_notes');
      setMemNotes(JSON.parse(notesFromMemory));
      console.log('this --->>>', notesFromMemory);
      if (value !== null) {
        console.log('This is value', value);
        setStore(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const setNoteAsync = async note => {
    try {
      const value = JSON.stringify(note);
      await AsyncStorage.setItem('@stored_notes', value);
      console.log('I am hit - bd:(');
    } catch (e) {}
  };

  useEffect(() => getData(), [show, note]);

  const pickImage = () => {
    launchImageLibrary(
      {
        title: 'You can choose one image',
        mediaType: 'photo',
        selectionLimit: 1,
      },
      res => {
        if (res.didCancel) return;
        else {
          setVal(res.assets);
        }
      },
    );
  };

  const getAllPosts = async () => {
    const response = await axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .catch(err => console.log(err));

    dispatch(setNotes(response.data));
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const handleNoteSubmit = note => {
    setNewNotes([...notes, note]);
    setNoteAsync(notes);
    setShow(false);
    sendLocalNotification(note);
    getData();
  };

  const sendLocalNotification = note => {
    PushNotificationIOS.addNotificationRequest({
      id: 'sampleNotification',
      title: 'Hey',
      subtitle: 'New Note Added',
      body: note,
      badge: 1,
    });
  };

  return (
    <>
      <SafeAreaView
        style={{flex: 1, alignItems: 'center', backgroundColor: '#fff'}}>
        <StatusBar barStyle="dark-content" backgroundColor="#000"></StatusBar>
        <Layout>
          <Heading>{store}'s Notes </Heading>
          {val.length > 0 && (
            <Image
              source={{
                uri: val[0].uri,
              }}
              style={{
                width: 240,
                height: 250,
                resizeMode: 'contain',
              }}
            />
          )}
          <ScrollView>
            {memNotes.length > 0 ? (
              memNotes?.map(val => {
                return (
                  <View style={styles.card}>
                    <TouchableOpacity
                      onLongPress={() => console.log('I am held')}>
                      <Text
                        style={{
                          fontWeight: '600',
                          fontSize: 14,
                          color: '#fff',
                        }}>
                        {val}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })
            ) : (
              <View>
                <Text style={{...styles.heading, fontSize: 16}}>
                  No New Notes
                </Text>
                <Image
                  source={require('../assets/images/Work-at-home.png')}
                  style={{
                    width: 240,
                    height: 250,
                    resizeMode: 'contain',
                  }}
                />
              </View>
            )}
            {/* {allNotes.length > 0 ? (
              allNotes.slice(0, 10).map(val => {
                return (
                  <View style={styles.card}>
                    <Text
                      style={{...styles.heading, fontSize: 16, color: '#fff'}}>
                      {val.title}
                    </Text>
                  </View>
                );
              })
            ) : (
              <View>
                <Text style={{fontSize: 10}}>No New Notes</Text>
                {val.length > 0 && (
                  <Image
                    source={{
                      uri: val[0].uri,
                    }}
                    style={{
                      width: 240,
                      height: 250,
                      resizeMode: 'contain',
                    }}
                  />
                )}
              </View>
            )} */}
          </ScrollView>
          <View>
            <Dialog.Container visible={show}>
              <Dialog.Title>Add note</Dialog.Title>
              <Dialog.Input onChangeText={note => setNote(note)}></Dialog.Input>
              <Dialog.Button label="Cancel" onPress={() => setShow(false)} />
              <Dialog.Button
                label="Add"
                onPress={() => handleNoteSubmit(note)}
              />
            </Dialog.Container>
          </View>

          <TouchableOpacity
            title="Press me"
            style={{
              ...styles.primaryButton,
              position: 'absolute',
              bottom: 30,
              right: 10,
              width: 40,
              height: 40,
              borderRadius: 1000,
            }}
            onPress={() => setShow(true)}>
            <Text style={{color: '#fff', fontWeight: '800', fontSize: 24}}>
              +
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="Press me"
            style={{
              ...styles.primaryButton,
              position: 'absolute',
              bottom: 30,
              left: 10,
              width: 40,
              height: 40,
              borderRadius: 1000,
            }}
            onPress={pickImage}>
            <Text style={{color: '#fff', fontWeight: '800', fontSize: 24}}>
              <Image
                source={icon}
                style={{
                  tintColor: '#fff',
                  height: 16,
                  width: 24,
                  resizeMode: 'contain',
                }}
              />
            </Text>
          </TouchableOpacity>
        </Layout>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: 'rgb(46,73,137)',
    fontWeight: '800',
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  formField: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#C9B693',
    marginTop: 20,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    width: 250,
    borderRadius: 4,
    borderColor: '#9E7777',
  },
  primaryButton: {
    backgroundColor: '#EF79BC',
    marginTop: 10,
    flex: 1,
    maxHeight: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    height: 20,
    width: 250,
  },
  card: {
    backgroundColor: '#6F69AC',
    marginTop: 5,
    marginBottom: 5,
    padding: 16,
    borderRadius: 8,
    width: 300,
  },
});

export default MainPage;
