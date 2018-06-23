import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  Dimensions,
  AsyncStorage
} from 'react-native'
import { Button } from 'react-native-elements'
import _ from 'lodash'
import { AppLoading } from 'expo'

import { SLIDE_DATA } from './SlideData'

class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isInitialized: null
    }
  }

  async componentWillMount() {
    // `AsyncStorage`の'isInitialized'から情報を読み込んで`isInitializedString`に保存
    let isInitializedString = await AsyncStorage.getItem('isInitialized')

    // もし`AsyncStorage`の'isInitialized'から読み込んだ情報が'true'だったら
    if (isInitializedString === 'true') {
      // `state`の方の`isInitialized`に`true`と上書き
      this.setState({ isInitialized: true })
      // 'main'画面へ飛ばす
      this.props.navigation.navigate('main')

      // もし`AsyncStorage`の'isInitialized'から読み込んだ情報が'true'じゃなかったら
    } else {
      // `state`の方の`isInitialized`に`false`と上書き
      this.setState({ isInitialized: false })
    }
  }

  //onPresssでmain tabに移動
  //await を使う場合はasyncを引数に指定する必要がある
  onStartButtonPress = async () => {
    //AsyncStorageにウェルカム画面表示済みという情報を保存する
    // `AsyncStorage`の処理を`await`(待機)してあげる
    await AsyncStorage.setItem('isInitialized', 'true') //
    this.props.navigation.navigate('main')
  }

  renderLastButton(index) {
    if (index === SLIDE_DATA.length - 1) {
      return (
        <Button
          style={{ padding: 10 }}
          buttonStyle={{ backgroundColor: 'deepskyblue' }}
          title="Let's get it started!"
          onPress={this.onStartButtonPress}
        />
      )
    }
  }

  renderSlides() {
    return SLIDE_DATA.map((slide, index) => {
      return (
        <View key={index} style={styles.slideStyle}>
          <View style={styles.containerStyle}>
            <Text style={styles.textStyle}>{slide.title}</Text>
            <Text style={styles.textStyle}>{slide.text}</Text>
          </View>

          <Image style={{ flex: 2 }} resizeMode="contain" source={slide.uri} />

          <View style={styles.containerStyle}>
            {this.renderLastButton(index)}
            <Text style={styles.textStyle}>{index + 1} / 3</Text>
          </View>
        </View>
      )
    })
  }

  render() {
    if (_.isNull(this.state.isInitialized)) {
      return <AppLoading />
    }
    return (
      <ScrollView horizontal pagingEnabled style={{ flex: 1 }}>
        {this.renderSlides()}
      </ScrollView>
    )
  }
}

const SCREEN_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
  slideStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'skyblue',
    width: SCREEN_WIDTH
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    padding: 5
  }
})

export default WelcomeScreen
