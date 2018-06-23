import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { ListItem, ButtonGroup } from 'react-native-elements' // ←追記部分

const ALL_INDEX = 0

const GREAT = 'sentiment-very-satisfied'
const GREAT_COLOR = 'red' // ← 追記部分
const GREAT_INDEX = 1

const GOOD = 'sentiment-satisfied'
const GOOD_COLOR = 'orange' // ← 追記部分
const GOOD_INDEX = 2

const POOR = 'sentiment-dissatisfied'
const POOR_COLOR = 'blue' // ← 追記部分
const POOR_INDEX = 3

//仮データ
const allReviewsTmp = [
  {
    country: 'USA',
    dateFrom: 'Jan/15/2018',
    dateTo: 'Jan/25/2018',
    imageURIs: [
      require('../../assets/add_image_placeholder.png'),
      require('../../assets/add_image_placeholder.png'),
      require('../../assets/add_image_placeholder.png')
    ],
    rank: GREAT
  },
  {
    country: 'USA',
    dateFrom: 'Feb/15/2018',
    dateTo: 'Feb/25/2018',
    imageURIs: [
      require('../../assets/add_image_placeholder.png'),
      require('../../assets/add_image_placeholder.png'),
      require('../../assets/add_image_placeholder.png')
    ],
    rank: GOOD
  },
  {
    country: 'USA',
    dateFrom: 'Mar/15/2018',
    dateTo: 'Mar/25/2018',
    imageURIs: [
      require('../../assets/add_image_placeholder.png'),
      require('../../assets/add_image_placeholder.png'),
      require('../../assets/add_image_placeholder.png')
    ],
    rank: POOR
  }
]

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedIndex: ALL_INDEX
    }
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
      rankedReviews = allReviewsTmp
    } else {
      for (let i = 0; i < allReviewsTmp.length; i++) {
        if (allReviewsTmp[i].rank === reviewRank) {
          rankedReviews.push(allReviewsTmp[i])
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
    const buttonList = ['All', 'Great (0)', 'Good (0)', 'Poor (0)']
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

export default HomeScreen
