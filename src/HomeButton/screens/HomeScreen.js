import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { ListItem, ButtonGroup } from 'react-native-elements'
import { connect } from 'react-redux'
import * as actions from '../../actions'

const ALL_INDEX = 0

const GREAT = 'sentiment-very-satisfied'
const GREAT_COLOR = 'red'
const GREAT_INDEX = 1

const GOOD = 'sentiment-satisfied'
const GOOD_COLOR = 'orange'
const GOOD_INDEX = 2

const POOR = 'sentiment-dissatisfied'
const POOR_COLOR = 'blue'
const POOR_INDEX = 3

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedIndex: ALL_INDEX
    }
  }

  componentWillMount() {
    this.props.fetchAllReviews() //Action Creatorを呼ぶ this.props.アクションクリエイター名
  }

  onListItemPress = selectedReview => {
    this.props.selectDetailReview(selectedReview) //to actioncreator

    this.props.navigation.navigate('detail')
  }

  renderReviews() {
    let reviewRank

    switch (this.state.selectedIndex) {
      case GREAT_INDEX:
        reviewRank = GREAT
        break
      case GOOD_INDEX:
        reviewRank = GOOD
        break

      case POOR_INDEX:
        reviewRank = POOR
        break
      default:
        break
    }

    let rankedReviews = []

    if (this.state.selectedIndex === ALL_INDEX) {
      rankedReviews = this.props.allReviews
    } else {
      for (let i = 0; i < this.props.allReviews.length; i++) {
        if (this.props.allReviews[i].rank === reviewRank) {
          rankedReviews.push(this.props.allReviews[i])
        }
      }
    }

    return (
      <ScrollView>
        {rankedReviews.map((review, index) => {
          let reviewColor

          switch (review.rank) {
            case GREAT:
              reviewColor = GREAT_COLOR
              break
            case GOOD:
              reviewColor = GOOD_COLOR
              break
            case POOR:
              reviewColor = POOR_COLOR
              break
            default:
              break
          }
          return (
            <ListItem
              key={index}
              leftIcon={{ name: review.rank, color: reviewColor }}
              title={review.country}
              subtitle={`${review.dateFrom} ~ ${review.dateTo}`}
              onPress={() => this.onListItemPress(review)}
            />
          )
        })}
      </ScrollView>
    )
  }

  onButtonGroupPress = selectedIndex => {
    this.setState({
      selectedIndex: selectedIndex
    })
  }
  render() {
    let nGreat = 0 // "Number of Great" の略。値が変更され得るので`let`で宣言
    let nGood = 0 // "Number of Good" の略。値が変更され得るので`let`で宣言
    let nPoor = 0 // "Number of Poor" の略。値が変更され得るので`let`で宣言

    for (let i = 0; i < this.props.allReviews.length; i++) {
      switch (this.props.allReviews[i].rank) {
        case GREAT: // `GREAT`だったら、
          nGreat++ // `nGreat`を1追加
          break // 比較を終了して抜け出す

        case GOOD: // `GOOD`だったら、
          nGood++ // `nGood`を1追加
          break // 比較を終了して抜け出す

        case POOR: // `POOR`だったら、
          nPoor++ // `nPoor`を1追加
          break // 比較を終了して抜け出す

        default:
          // それ以外だったら、
          break // (特に何もせず)抜け出す
      }
    }

    const buttonList = [
      `All (${this.props.allReviews.length})`, // ←バッククォート&テンプレート文字列に変更
      `Great (${nGreat})`, // ←バッククォート&テンプレート文字列に変更
      `Good (${nGood})`, // ←バッククォート&テンプレート文字列に変更
      `Poor (${nPoor})` // ←バッククォート&テンプレート文字列に変更
    ]

    return (
      <View style={{ flex: 1 }}>
        <ButtonGroup // ←追記部分
          buttons={buttonList}
          selectedIndex={this.state.selectedIndex}
          onPress={this.onButtonGroupPress}
        />
        {this.renderReviews()}
      </View>
    )
  }
}

const mapStateToProps = state => {
  // `state`を引数として受け取るアロー関数
  return {
    // `state.review.allReviews`を → `this.props.allReviews`にコピー
    allReviews: state.review.allReviews
  }
}

export default connect(
  mapStateToProps,
  actions
)(HomeScreen)
