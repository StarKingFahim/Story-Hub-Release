import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import LoginScreen from './screens/LoginScreen';
import {BottomNavigator} from './Components.js/bottomNavigator';
import SettingScreen from './screens/Settings';
import customSidebarMenu from './Components.js/CustomSideBarMenu';
import { AppDrawerNavigator } from './Components.js/AppDrawerNavigator'




export default function App() {
  return (
      <AppContainer/>
  );
}


const AppDrawNavigator = createDrawerNavigator({
  Home : {
    screen : BottomNavigator
    },
  Settings : {
    screen : SettingScreen
    }
  },
  {
    contentComponent:customSidebarMenu
  },
  {
    initialRouteName : 'Home'
  })

const SwitchNavigator = createSwitchNavigator({
  LoginScreen:LoginScreen,
  BottomNavigator:BottomNavigator,
 })

 

const AppContainer = createAppContainer(SwitchNavigator);