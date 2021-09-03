import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Image, Text, StyleSheet, View, Button} from 'react-native';
import Heading from '../components/UI/Heading';
import Layout from '../components/Layout';
import {ButtonPrimary, ButtonSecondary} from '../components/UI/Button';

function Profile({navigation}) {
  const [store, setStore] = useState();
  const [db, setDB] = useState();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@storage_Key');
      await AsyncStorage.removeItem('@birth_day');
    } catch (e) {
      console.log(e);
    }

    navigation.navigate('Home');
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      const dob = await AsyncStorage.getItem('@birth_day');
      const date = new Date(dob).toDateString();
      if (value !== null && dob !== null) {
        setStore(value);
        console.log('this is ', dob);
        setDB(dob);
      }
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1630551358963-94275ce966ea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
        }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 1000,
          resizeMode: 'contain',
        }}></Image>
      <Heading>{store}</Heading>
      {console.log('lll', db)}
      <Heading style={{fontSize: 16}}>
        DOB: {new Date('1987-07-15T12:46:22.000Z').toDateString()}
      </Heading>
      <ButtonPrimary onPress={() => navigation.navigate('Main')}>
        Add Notes
      </ButtonPrimary>
      <ButtonSecondary onPress={handleLogout}>Logout</ButtonSecondary>
    </Layout>
  );
}

export default Profile;
