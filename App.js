import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import store from './redux/store';
import {Provider} from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';
import Signup from './src/screens/Signup';
import Welcome from './src/screens/Welcome';
import MainPage from './src/screens';
import VideoPlayer from './src/screens/Video';
import Notify from './src/screens/Notify';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}) => {
  return (
    <>
      <SafeAreaView
        style={{flex: 1, alignItems: 'center', backgroundColor: '#fff'}}>
        <StatusBar barStyle="dark-content" backgroundColor="#000"></StatusBar>
        <View style={styles.container}>
          <Text style={styles.heading}>Welcome to your Notes</Text>
          <Image
            source={require('./src/assets/images/Couch-Potato.png')}
            style={{width: 240, height: 250, resizeMode: 'contain'}}
          />
          <TouchableOpacity
            title="Press me"
            style={styles.primaryButton}
            onPress={() => navigation.push('Signup')}>
            <Text style={{color: '#fff', fontWeight: '800'}}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="Press me"
            onPress={() => navigation.push('Video')}>
            <Text
              style={{
                color: 'rgb(46,73,137)',
                marginTop: 16,
                fontWeight: '800',
              }}>
              Video
            </Text>
          </TouchableOpacity>
          <></>
        </View>
      </SafeAreaView>
    </>
  );
};

const HelloWorldApp = () => {
  RNBootSplash.hide({fade: true}); // fade
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Main" component={MainPage} />
          <Stack.Screen name="Video" component={VideoPlayer} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Notify" component={Notify} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 250,
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

export default HelloWorldApp;
