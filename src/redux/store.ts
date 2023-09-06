import { configureStore } from '@reduxjs/toolkit'

import sickReducer from './sickSlice'

export const store = configureStore({
  reducer: {
    sicks: sickReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
