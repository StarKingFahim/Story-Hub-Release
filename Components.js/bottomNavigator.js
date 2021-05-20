import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import ReadStory from '../screens/SelectionScreen';
import WriteStory from '../screens/WriteStoryScreen';
import ExchangeScreen from '../screens/ExchangeScreen';
import LoginScreen from '../screens/LoginScreen';

export const BottomNavigator = createBottomTabNavigator({
  WriteStory: {
    screen: WriteStory,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require('../assets/read.png')}
          style={{ width: 20, height: 20 }}
        />
      ),
      tabBarLabel: 'Write Story',
    },
  },

  ReadStory: {
    screen: ReadStory,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require('../assets/write.png')}
          style={{ width: 20, height: 20 }}
        />
      ),
      tabBarLabel: 'Read Story',
    },
  },

  Exchange: {
    screen: ExchangeScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require('../assets/request-list.png')}
          style={{ width: 20, height: 20 }}
        />
      ),
      tabBarLabel: 'EXCHANGER',
    },
  },
});
