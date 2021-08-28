import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Welcome = ({route, navigation}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
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
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>Hi, {name}</Text>
          <Text style={{...styles.heading, fontSize: 20}}>
            Tell us about yourself
          </Text>
        </View>
        <Image
          source={require('../assets/images/Mummy.png')}
          style={{width: 240, height: 250, resizeMode: 'contain'}}
        />
        <View>
          <Modal visible={show} animationType="fade">
            <View style={styles.container}>
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
              <TouchableOpacity
                title="Press me"
                style={styles.primaryButton}
                onPress={() => setShow(false)}>
                <Text style={{color: '#fff', fontWeight: '800'}}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <TouchableOpacity
            title="Press me"
            style={{
              ...styles.primaryButton,
              marginTop: 10,
              backgroundColor: 'rgb(115,141,225)',
            }}
            onPress={() => setShow(true)}>
            <Text style={{color: '#fff', fontWeight: '800'}}>Add Birthday</Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="Press me"
            style={{
              ...styles.primaryButton,
              marginTop: 10,
              backgroundColor: 'rgb(255,255,255)',
            }}
            onPress={() => navigation.navigate('Main')}>
            <Text style={{color: '#000', fontWeight: '800'}}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
  primaryButton: {
    backgroundColor: '#EF79BC',
    flex: 1,
    maxHeight: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    height: 20,
    width: 250,
  },
});

export default Welcome;
