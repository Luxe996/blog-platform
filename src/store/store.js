import thunkMiddleware from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'

import { articleReducer } from './article-reducer'
import { userReducer } from './user-reducer'

export const store = configureStore({
  reducer: {
    article: articleReducer,
    user: userReducer,
  },
  middleware: [thunkMiddleware],
})
