import React from 'react'
import {
  Text,
  View,
  ScrollView, // 描画に直接関わるコンポーネント達
  Dimensions,
  Platform,
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
      }
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
