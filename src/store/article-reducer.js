import { ArticleAPI } from '../api/api'
const SET_LOADING = 'SET_LOADING'
const SET_ARTICLES = 'SET_ARTICLES'
const SET_ARTICLE = 'SET_ARTICLE'
const SET_LIKE = 'SET_LIKE'
const CREATE_ARTICLE = 'CREATE_ARTICLE'

const initialState = {
  articles: [],
  selectArticle: null,
  createArticle: null,
  articlesCount: 0,
  loaded: true,
  liked: false,
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
    case SET_ARTICLE: {
      return {
        ...state,
        selectArticle: action.article,
      }
    }
    case CREATE_ARTICLE: {
      return {
        ...state,
        createArticle: action.article,
      }
    }
    case SET_LOADING: {
      return {
        ...state,
        loaded: action.value,
      }
    }
    case SET_LIKE: {
      return {
        ...state,
        liked: action.like,
      }
    }
    default: {
      return state
    }
  }
}

const SetArticlesAC = (data) => ({ type: SET_ARTICLES, data })
export const SetArticleAC = (article) => ({ type: SET_ARTICLE, article })
export const CreateArticleAC = (article) => ({ type: CREATE_ARTICLE, article })
const SetLoadingAC = (value) => ({ type: SET_LOADING, value })
export const SetLikesAC = (like) => ({ type: SET_LIKE, like })

export const SetArticlesTC = (offset) => async (dispatch) => {
  dispatch(SetLoadingAC(false))
  await ArticleAPI.getArticles(offset).then((res) => {
    dispatch(SetArticlesAC(res.data))
  })
  dispatch(SetLoadingAC(true))
}

export const SetArticleTC = (slug) => async (dispatch) => {
  dispatch(SetLoadingAC(false))
  await ArticleAPI.getArticle(slug).then((res) => {
    dispatch(SetArticleAC(res.data.article))
  })
  dispatch(SetLoadingAC(true))
}

export const CreateArticleTC = (data) => async (dispatch) => {
  dispatch(SetLoadingAC(false))
  await ArticleAPI.createArticle(data).then((res) => {
    dispatch(CreateArticleAC(res.data.article))
  })
  dispatch(SetLoadingAC(true))
}

export const EditArticleTC = (slug, data) => async (dispatch) => {
  dispatch(SetLoadingAC(false))
  await ArticleAPI.editArticle(slug, data).then((res) => {
    dispatch(CreateArticleAC(res.data.article))
  })
  dispatch(SetLoadingAC(true))
}

export const DeleteArticleTC = (slug) => async (dispatch) => {
  dispatch(SetLoadingAC(false))
  await ArticleAPI.deleteArticle(slug)
  dispatch(SetLoadingAC(true))
}

export const likeArticleTC = (slug, req) => async (dispatch) => {
  dispatch(SetLoadingAC(false))
  await ArticleAPI.likeArticle(slug).then((res) => {
    if (req === 'one') {
      dispatch(SetArticleAC(res.data.article))
    } else {
      dispatch(SetLikesAC(true))
    }
  })
  dispatch(SetLoadingAC(true))
}

export const dislikeArticleTC = (slug, req) => async (dispatch) => {
  dispatch(SetLoadingAC(false))
  await ArticleAPI.dislikeArticle(slug).then((res) => {
    if (req === 'one') {
      dispatch(SetArticleAC(res.data.article))
    } else {
      dispatch(SetLikesAC(true))
    }
  })
  dispatch(SetLoadingAC(true))
}
