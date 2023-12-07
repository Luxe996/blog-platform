import { ArticleAPI } from '../api/api'
const SET_ARTICLES = 'SET_ARTICLES'

const initialState = {
  articles: [],
  articlesCount: 0,
  loaded: true,
}

export const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTICLES: {
      return {
        ...state,
        articles: action.data.articles,
        articlesCount: action.data.articlesCount,
      }
    }
    default: {
      return state
    }
  }
}

const SetArticlesAC = (data) => ({ type: SET_ARTICLES, data })

export const SetArticlesTC = () => async (dispatch) => {
  await ArticleAPI.getArticles().then((res) => {
    dispatch(SetArticlesAC(res.data))
  })
}
