import jobsReducer from './slices/jobsSlice';
import tagsReducer from './slices/tagsSlice';
import isFetchedReducer from './slices/isFetchedSlice';
import isErrorReducer from './slices/isErrorSlice';

import { configureStore } from '@reduxjs/toolkit'

export const makeStore = () => {
  return configureStore({
    reducer: {
      jobs: jobsReducer,
      tags: tagsReducer,
      isError: isErrorReducer,
      isFetched: isFetchedReducer
  }})
}


export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']