import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import Signup from '../src/screens/Signup';
import MainPage from '../src/screens/index';
import {Image} from 'react-native';

function BottomBar() {
  return (
    <Tab.Navigator tabBarOptions={{showLabel: false}}>
      <Tab.Screen
        name="Home"
        component={MainPage}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                tintColor: focused ? '#EF79BC' : '#000',
              }}
              source={require('../src/assets/icons/home.png')}
            />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="Signin"
        component={Signup}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                tintColor: focused ? '#EF79BC' : '#000',
                height: 24,
                width: 24,
              }}
              source={require('../src/assets/icons/join.png')}
            />
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
}

export default BottomBar;
