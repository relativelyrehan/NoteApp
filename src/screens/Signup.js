import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {ButtonPrimary, ButtonSecondary} from '../components/UI/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = ({navigation}) => {
  const [name, setName] = useState('');

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@storage_Key', value);
      console.log('I am hit');
    } catch (e) {
      // saving error
    }
  };

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
          <Text style={styles.heading}>Join Now</Text>
        </View>
        <Image
          source={require('../assets/images/Work-at-home.png')}
          style={{width: 240, height: 250, resizeMode: 'contain'}}
        />
        <View>
          <TextInput
            value={name}
            onChangeText={name => setName(name)}
            style={styles.input}
            placeholder="Name"
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
        <View>
          <ButtonPrimary
            onPress={() => {
              if (name) {
                storeData(name);
                navigation.navigate('Welcome', {
                  name: name,
                });
              } else {
                Alert.alert('Enter name');
              }
            }}>
            Sign up
          </ButtonPrimary>
          <ButtonSecondary
            onPress={() => {
              navigation.popToTop();
            }}>
            Not now
          </ButtonSecondary>
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

export default Signup;
