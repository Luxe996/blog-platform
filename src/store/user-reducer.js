import { UserAPI } from '../api/api'

const REGISTRATION = 'REGISTRATION'
const SET_ERROR = 'SET_ERROR'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

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
    default: {
      return state
    }
  }
}

const RegistrationAC = (user) => ({ type: REGISTRATION, user })
const LoginAC = (user) => ({ type: LOGIN, user })
export const LogOutAC = () => ({ type: LOGOUT })
const SetErrorAC = (errors) => ({ type: SET_ERROR, errors })

export const RegistrationTC = (username, email, password) => async (dispatch) => {
  await UserAPI.registration(username, email, password)
    .then((res) => {
      dispatch(RegistrationAC(res.data.user))
      dispatch(SetErrorAC({}))
    })
    .catch((err) => {
      dispatch(SetErrorAC(err.response.data))
    })
}

export const LoginTC = (email, password) => async (dispatch) => {
  await UserAPI.login(email, password)
    .then((res) => {
      dispatch(LoginAC(res.data.user))
      dispatch(SetErrorAC({}))
    })
    .catch((err) => {
      dispatch(SetErrorAC(err.response.data.errors))
    })
}
