import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Button
} from 'react-native'
//import { SLIDE_DATA } from './Welcome_Slide_Data'

import { createBottomTabNavigator } from 'react-navigation'

const SCREEN_WIDTH = Dimensions.get('window').width

const SLIDE_DATA = [
  { title: 'Step: 1', text: 'aaa' },
  { title: 'Step: 2', text: 'bbb' },
  { title: 'Step: 3', text: 'ccc' }
]

function renderSlides() {
  return SLIDE_DATA.map((slide, index) => {
    return (
      <View
        key={index}
        style={{ flex: 1, backgroundColor: 'skyblue', width: SCREEN_WIDTH }}
      >
        <Text>{slide.title}</Text>
        <Text>{slide.text}</Text>
        <Text>{index + 1} / 3</Text>
      </View>
    )
  })
}

const WelcomeScreen = () => {
  return (
    <ScrollView horizontal pagingEnabled style={{ flex: 1 }}>
      {renderSlides()}
    </ScrollView>
  )
}

export { WelcomeScreen }
