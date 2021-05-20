import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './bottomNavigator'
import CustomSidebarMenu  from './CustomSideBarMenu';
import MyBartersScreen from '../screens/MyBarterScreen';
import SettingScreen from '../screens/Settings';
import NotificationScreen from '../screens/NotificationScreen';
import LoginScreen from '../screens/LoginScreen';

export const AppDrawerNavigator = createDrawerNavigator({
  Login : {
    screen : LoginScreen
  },
  MyBarters:{
      screen : MyBartersScreen,
    },
  Notifications :{
    screen : NotificationScreen
  },
    Setting : {
      screen : SettingScreen
    }
},
  {
    contentComponent:CustomSidebarMenu
  },
  {
    initialRouteName : 'Login'
  })