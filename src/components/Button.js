import React from 'react'
import { TouchableOpacity, StyleSheet, Button, Text, View } from 'react-native'

const TouchableButton = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.handleButtonPress}>
        <Text>hgauhgua</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 30
  }
})

export { TouchableButton }
