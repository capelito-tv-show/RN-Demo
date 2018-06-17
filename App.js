import React from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'

import { createBottomTabNavigator } from 'react-navigation'

import AlertSample from './src/samples/Alert'
import { WelcomeScreen } from './src/WelcomeScreen/WelcomeScreen'

import HomeScreen from './src/HomeButton/screens/HomeScreen'
import AddScreen from './src/HomeButton/screens/AddScreen'
import ProfileScreen from './src/HomeButton/screens/ProfileScreen'

import { Header } from './src/components/Header'
import { MainButton } from './src/components/MainButton'

export default class App extends React.Component {
  render() {
    const MainTab = createBottomTabNavigator({
      homeStack: { screen: HomeScreen },
      addStack: { screen: AddScreen },
      profileStack: { screen: ProfileScreen }
    })
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
