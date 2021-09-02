import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView, View, Image, Modal} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ButtonPrimary, ButtonSecondary} from '../components/UI/Button';
import Heading from '../components/UI/Heading';
import Layout from '../components/Layout';

const Welcome = ({route, navigation}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [store, setStore] = useState({
    name: '',
    bd: '',
  });

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      const value2 = await AsyncStorage.getItem('@birth_day');
      if (value !== null) {
        console.log('This is value', value);
        setStore({
          ...store,
          name: value,
        });
      }
      if (value2 !== null) {
        setStore({
          ...store,
          bd: value2,
        });
      }
    } catch (e) {}
  };

  const setBirthday = async val => {
    try {
      const value = JSON.stringify(val);
      const bd = await AsyncStorage.setItem('@birth_day', value);
      console.log('I am hit - bd:(');
    } catch (e) {}
  };

  useEffect(() => getData(), [show]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setBirthday(currentDate);
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const {name} = route.params;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <Layout>
        <View>
          <Heading>Hi, {store.name || name}</Heading>
          <Heading style={{fontSize: 20}}>Tell us about yourself</Heading>
        </View>
        <Image
          source={require('../assets/images/Mummy.png')}
          style={{width: 240, height: 250, resizeMode: 'contain'}}
        />
        <View>
          <Modal visible={show} animationType="fade">
            <Layout>
              <Image
                source={require('../assets/images/Work-at-home.png')}
                style={{width: 240, height: 250, resizeMode: 'contain'}}
              />
              <View style={{width: 300}}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'date'}
                  is24Hour={true}
                  display="spinner"
                  onChange={onChange}
                />
              </View>
              <ButtonPrimary
                onPress={() => {
                  navigation.navigate('Main');
                  setShow(false);
                }}>
                Correct
              </ButtonPrimary>
              <ButtonSecondary onPress={() => setShow(false)}>
                close
              </ButtonSecondary>
            </Layout>
          </Modal>
          <ButtonPrimary onPress={() => setShow(true)}>
            Add Birthday
          </ButtonPrimary>
          <ButtonSecondary onPress={() => navigation.navigate('Main')}>
            Skip
          </ButtonSecondary>
        </View>
      </Layout>
    </SafeAreaView>
  );
};

export default Welcome;
