import React from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'

import { Header } from '../components/Header'
import { MainButton } from '../components/MainButton'
import { TouchableButton } from '../components/Button'

class AlertSample extends React.Component {
  _handleButtonPress = () => {
    Alert.alert('ボタンが押されました！!')
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <Header headerText={'hgua'} />
        <View style={styles.container}>
          <Text>Open up Alert.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <MainButton
            buttonTitle={'ghaughau'}
            styles={styles.button}
            handleButtonPress={this._handleButtonPress}
          />
          <TouchableButton handleButtonPress={this._handleButtonPress} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  container: {
    justifyContent: 'center'
  },
  button: {
    padding: 20,
    backgroundColor: '#A9A9F5'
  }
})

export default AlertSample
