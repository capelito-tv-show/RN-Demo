import React from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'

import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'

import AlertSample from './src/samples/Alert'
import WelcomeScreen from './src/WelcomeScreen/WelcomeScreen'

import HomeScreen from './src/HomeButton/screens/HomeScreen'
import AddScreen from './src/HomeButton/screens/AddScreen'
import ProfileScreen from './src/HomeButton/screens/ProfileScreen'
import DetailScreen from './src/HomeButton/screens/DetailScreen'
import Setting1Screen from './src/HomeButton/screens/Setting1Screen'
import Setting2Screen from './src/HomeButton/screens/Setting2Screen'

import { Header } from './src/components/Header'
import { MainButton } from './src/components/MainButton'

export default class App extends React.Component {
  render() {
    const HomeStack = createStackNavigator({
      // ←追記部分
      home: { screen: HomeScreen },
      detail: { screen: DetailScreen }
    })

    const AddStack = createStackNavigator({
      // ←追記部分
      add: { screen: AddScreen }
    })

    const ProfileStack = createStackNavigator({
      // ←追記部分
      profile: { screen: ProfileScreen },
      setting1: { screen: Setting1Screen },
      setting2: { screen: Setting2Screen }
    })

    const MainTab = createBottomTabNavigator({
      homeStack: { screen: HomeStack }, // ←変更部分
      addStack: { screen: AddStack }, // ←変更部分
      profileStack: { screen: ProfileStack } // ←変更部分
    })

    //createBottomTabNavigator({ 画面達 }, { タブに関する設定など });
    const NavigatorTab = createBottomTabNavigator(
      {
        welcome: { screen: WelcomeScreen },
        main: { screen: MainTab }
      },
      {
        //Tabを非表示にする設定
        navigationOptions: { tabBarVisible: false }
      }
    )

    return (
      <View style={styles.wrapper}>
        <NavigatorTab />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff'
    //alignItems: 'center'
  },
  container: {
    justifyContent: 'center'
  }
})
