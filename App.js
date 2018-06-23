import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  StatusBar
} from 'react-native'

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
      home: {
        screen: HomeScreen,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'Treco',
          headerBackTitle: 'Home'
        }
      },
      detail: {
        screen: DetailScreen,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'Detail'
        }
      }
    })
    // 1階層目以外はタブを隠す
    HomeStack.navigationOptions = ({ navigation }) => {
      return {
        tabBarVisible: navigation.state.index === 0
      }
    }

    const AddStack = createStackNavigator({
      // ←追記部分
      add: {
        screen: AddScreen,
        navigationOptions: {
          header: null
        }
      }
    })
    // 0階層目以外(つまり全階層)はタブを隠す
    AddStack.navigationOptions = ({ navigation }) => {
      return {
        tabBarVisible: navigation.state.index === -1 // ←0じゃなくて-1
      }
    }

    const ProfileStack = createStackNavigator({
      // ←追記部分
      profile: {
        screen: ProfileScreen,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'Treco',
          headerBackTitle: 'Profile'
        }
      },
      setting1: {
        screen: Setting1Screen,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'Setting 1'
        }
      },
      setting2: {
        screen: Setting2Screen,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'Setting 2'
        }
      }
    })

    ProfileStack.navigationOptions = ({ navigation }) => {
      return {
        tabBarVisible: navigation.state.index === 0
      }
    }

    const MainTab = createBottomTabNavigator(
      {
        homeStack: {
          screen: HomeStack,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Image
                style={{ height: 25, width: 25, tintColor: tintColor }}
                source={require('./src/assets/home.png')}
              />
            ),
            title: 'Home'
          }
        },
        addStack: {
          screen: AddStack,
          navigationOptions: {
            tabBarIcon: () => (
              <Image
                style={{ height: 25, width: 25, tintColor: 'deepskyblue' }}
                source={require('./src/assets/add.png')}
              />
            ),
            title: ''
          }
        },
        profileStack: {
          screen: ProfileStack,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Image
                style={{ height: 25, width: 25, tintColor: tintColor }}
                source={require('./src/assets/profile.png')}
              />
            ),
            title: 'Profile'
          }
        }
      },
      {
        swipeEnabled: false // Android用設定
      }
    )

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
        <StatusBar barStyle="light-content" />
        <NavigatorTab />
      </View>
    )
  }
}

const headerNavigationOptions = {
  headerStyle: {
    backgroundColor: 'deepskyblue',
    marginTop: Platform.OS === 'android' ? 24 : 0 //'' ? oo : xx ←もし''だったらooする。それ以外はxx
  },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white'
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
