import { FETCH_ALL_REVIEWS, SELECT_DETAIL_REVIEW } from './type'

export const fetchAllReviews = () => {
  // 'type':どんな情報なのかReducer側で識別するための名前
  // 'payload':Reducerに渡す情報の中身
  return { type: FETCH_ALL_REVIEWS, payload: allReviewsTmp }
}

export const selectDetailReview = selectedReview => {
  return { type: SELECT_DETAIL_REVIEW, payload: selectedReview }
}

const GREAT = 'sentiment-very-satisfied' // ←忘れずに
const GOOD = 'sentiment-satisfied' // ←忘れずに
const POOR = 'sentiment-dissatisfied' // ←忘れずに

//仮データ
const allReviewsTmp = [
  {
    country: 'USA',
    dateFrom: 'Jan/15/2018',
    dateTo: 'Jan/25/2018',
    imageURIs: [
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png')
    ],
    rank: GREAT
  },
  {
    country: 'USA',
    dateFrom: 'Feb/15/2018',
    dateTo: 'Feb/25/2018',
    imageURIs: [
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png')
    ],
    rank: GOOD
  },
  {
    country: 'USA',
    dateFrom: 'Mar/15/2018',
    dateTo: 'Mar/25/2018',
    imageURIs: [
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png')
    ],
    rank: POOR
  }
]
