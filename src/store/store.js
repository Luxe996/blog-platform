import thunkMiddleware from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'

import { articleReducer } from './article-reducer'

export const store = configureStore({
  reducer: {
    article: articleReducer,
  },
  middleware: [thunkMiddleware],
})
