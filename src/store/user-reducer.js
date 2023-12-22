import { UserAPI } from '../api/api'

const REGISTRATION = 'REGISTRATION'
const SET_ERROR = 'SET_ERROR'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const SET_IMAGE = 'SET_IMAGE'

const initialState = {
  user: {
    username: '',
    email: '',
    token: '',
    image: '',
  },
  error: {},
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION: {
      return {
        ...state,
        user: action.user,
      }
    }
    case LOGIN: {
      return {
        ...state,
        user: action.user,
      }
    }
    case LOGOUT: {
      localStorage.clear()
      return {
        ...state,
        user: {},
      }
    }
    case SET_ERROR: {
      return {
        ...state,
        error: action.errors,
      }
    }
    case SET_IMAGE: {
      return {
        ...state,
        user: {
          ...state.user,
          image: action.image,
        },
      }
    }
    default: {
      return state
    }
  }
}

const RegistrationAC = (user) => ({ type: REGISTRATION, user })
const LoginAC = (user) => ({ type: LOGIN, user })
export const LogOutAC = () => ({ type: LOGOUT })
const SetErrorAC = (errors) => ({ type: SET_ERROR, errors })
const SetImageAC = (image) => ({ type: SET_IMAGE, image })
// const EditProfileAC = () => ({ type: EDIT_PROFILE, image })

const SetImageTC = (username) => async (dispatch) => {
  await UserAPI.getImage(username)
    .then((res) => {
      dispatch(SetImageAC(res.data.profile.image))
    })
    .catch((err) => {
      dispatch(SetErrorAC(err.response.date.errors))
    })
}

export const RegistrationTC = (username, email, password) => async (dispatch) => {
  await UserAPI.registration(username, email, password)
    .then((res) => {
      localStorage.setItem('token', res.data.user.token)
      dispatch(RegistrationAC(res.data.user))
      dispatch(SetImageTC(res.data.user.username))
      dispatch(SetErrorAC({}))
    })
    .catch((err) => {
      dispatch(SetErrorAC(err.response.data))
    })
}

export const LoginTC = (email, password) => async (dispatch) => {
  await UserAPI.login(email, password)
    .then((res) => {
      localStorage.setItem('token', res.data.user.token)
      dispatch(LoginAC(res.data.user))
      dispatch(SetImageTC(res.data.user.username))
      dispatch(SetErrorAC({}))
    })
    .catch((err) => {
      dispatch(SetErrorAC(err.response.data.errors))
    })
}

export const EditProfileTC = (data) => async (dispatch) => {
  await UserAPI.editProfile(data)
    .then((res) => {
      localStorage.setItem('token', res.data.user.token)
      dispatch(LoginAC(res.data.user))
      dispatch(SetImageTC(res.data.user.username))
      dispatch(SetErrorAC({}))
    })
    .catch((err) => {
      dispatch(SetErrorAC(err.response.data.errors))
    })
}

export const RelogTC = () => async (dispatch) => {
  await UserAPI.relog()
    .then((res) => {
      localStorage.setItem('token', res.data.user.token)
      dispatch(LoginAC(res.data.user))
      dispatch(SetImageTC(res.data.user.username))
      dispatch(SetErrorAC({}))
    })
    .catch((err) => {
      dispatch(SetErrorAC(err.response.data.errors))
    })
}
