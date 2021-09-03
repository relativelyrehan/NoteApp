import React from 'react';
import {SafeAreaView, Image, StatusBar} from 'react-native';
import store from './redux/store';
import {Provider} from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';
import Signup from './src/screens/Signup';
import Welcome from './src/screens/Welcome';
import MainPage from './src/screens';
import VideoPlayer from './src/screens/Video';
import Notify from './src/screens/Notify';
import Layout from './src/components/Layout';
import Heading from './src/components/UI/Heading';
import Profile from './src/screens/Profile';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ButtonPrimary, ButtonSecondary} from './src/components/UI/Button';

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}) => {
  const NavigateToSignUp = () => {
    navigation.push('Signup');
  };

  const NavigateToVideo = () => {
    navigation.push('Video');
  };

  return (
    <>
      <SafeAreaView
        style={{flex: 1, alignItems: 'center', backgroundColor: '#fff'}}>
        <StatusBar barStyle="dark-content" backgroundColor="#000"></StatusBar>
        <Layout>
          <Heading>Welcome to your Notes</Heading>
          <Image
            source={require('./src/assets/images/Couch-Potato.png')}
            style={{width: 240, height: 250, resizeMode: 'contain'}}
          />
          <ButtonPrimary onPress={NavigateToSignUp}>Get Started</ButtonPrimary>
          <ButtonSecondary onPress={NavigateToVideo}>
            Watch Trailer
          </ButtonSecondary>
        </Layout>
      </SafeAreaView>
    </>
  );
};

const HelloWorldApp = () => {
  RNBootSplash.hide({fade: true}); // fade
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Main" component={MainPage} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Video" component={VideoPlayer} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Notify" component={Notify} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default HelloWorldApp;
