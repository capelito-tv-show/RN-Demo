import React from 'react'
import { StyleSheet, Button, Text, View } from 'react-native'

const MainButton = props => {
  return (
    <View style={styles.container}>
      <Button
        title={props.buttonTitle}
        style={props.styles}
        onPress={props.handleButtonPress}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 30
  }
})

export { MainButton }
