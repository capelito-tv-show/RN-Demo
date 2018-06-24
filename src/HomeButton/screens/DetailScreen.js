import React from 'react'
import {
  Text,
  View,
  ScrollView, // 描画に直接関わるコンポーネント達
  Dimensions,
  Platform,
  Image,
  Modal,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { MapView } from 'expo'
import { connect } from 'react-redux'
import Geocoder from 'react-native-geocoding'
import * as actions from '../../actions'

const SCREEN_WIDTH = Dimensions.get('window').width
const MAP_ZOOM_RATE = 15.0

class DetailScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMapLoaded: false, //地図の読み込み未完了 GeoCoder
      initialRegion: {
        latitude: 35.709, // 東京都の緯度
        longitude: 139.732, // 東京都の経度
        latitudeDelta: MAP_ZOOM_RATE, // 緯度方向のズーム度合い
        longitudeDelta: MAP_ZOOM_RATE * 2.25 // 経度方向のズーム度合い(緯度方向の2.25倍)
      },
      modalVisible: false,
      modalImageURI: require('../../assets/image_placeholder.png')
    }
  }

  async componentWillMount() {
    Geocoder.setApiKey('AIzaSyC1kDfRxJQP6QgGKpQZcopPwRLn8khcz8E')

    let result = await Geocoder.getFromLocation(this.props.detailReview.country)

    this.setState({
      isMapLoaded: true,
      initialRegion: {
        latitude: result.results[0].geometry.location.lat,
        longitude: result.results[0].geometry.location.lng, // 変換後の経度
        latitudeDelta: MAP_ZOOM_RATE, // 値自体は変わっていないが書く必要あり
        longitudeDelta: MAP_ZOOM_RATE * 2.25 // 値自体は変わっていないが書く必要あり
      }
    })
  }

  renderImages() {
    const imageArray = [
      { isImage: false, uri: require('../../assets/image_placeholder.png') },
      { isImage: false, uri: require('../../assets/image_placeholder.png') },
      { isImage: false, uri: require('../../assets/image_placeholder.png') }
    ]

    // 添付されている画像の数だけ繰り返す(最大3回繰り返される)
    for (let i = 0; i < this.props.detailReview.imageURIs.length; i++) {
      imageArray[i].isImage = true

      // 添付画像の保存場所に更新
      imageArray[i].uri = this.props.detailReview.imageURIs[i]
    }

    return (
      // 縦ではなく横方向に3つ並べる
      <View style={{ flexDirection: 'row' }}>
        // `imageArray`の個数分(3つ)だけ繰り返す
        {imageArray.map((image, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                this.setState({
                  modalVisible: image.isImage,
                  modalImageURI: image.uri
                })
              }
            >
              <Image
                // 縦も横も同じサイズ(スマホ画面の横幅÷3)、つまり正方形画像
                style={{ height: SCREEN_WIDTH / 3, width: SCREEN_WIDTH / 3 }}
                // 表示する画像のソース
                source={image.uri}
              />
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  render() {
    if (this.state.isMapLoaded === false) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        <Modal
          visible={this.state.modalVisible}
          animationType="fade"
          transparent={false}
        >
          <View style={{ flex: 1, backgroundColor: 'black' }}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              // タッチされたら、モーダルを非表示にする
              onPress={() => this.setState({ modalVisible: false })}
            >
              <Image // ←追記ここから
                // 縦も横も同じサイズ(スマホ画面の横幅)、つまり正方形画像
                style={{ height: SCREEN_WIDTH, width: SCREEN_WIDTH }}
                // 表示する画像のソース
                source={this.state.modalImageURI}
              />{' '}
              // ←追記ここまで />
            </TouchableOpacity>
          </View>
        </Modal>
        <ScrollView>
          <View style={{ alignItems: 'center', padding: 20 }}>
            <Text style={{ fontSize: 30, padding: 5 }}>
              {this.props.detailReview.country}
            </Text>
            <Text style={{ padding: 5 }}>
              {this.props.detailReview.dateFrom} ~
              {this.props.detailReview.dateTo}
            </Text>
          </View>
          <MapView
            style={{ height: SCREEN_WIDTH }}
            scrollEnabled={false}
            cacheEnabled={Platform.OS === 'android'}
            initialRegion={this.state.initialRegion}
          />
          {this.renderImages()}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return { detailReview: state.review.detailReview }
}

export default connect(
  mapStateToProps,
  actions
)(DetailScreen)
