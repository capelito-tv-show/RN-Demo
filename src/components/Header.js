import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const Header = props => {
  return (
    <View style={styles.Header}>
      <Text>{props.headerText}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  Header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50
  }
})
