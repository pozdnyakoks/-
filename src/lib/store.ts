import jobsReducer from './slices/jobsSlice';
import tagsReducer from './slices/tagsSlice';
import isLoadingReducer from './slices/isLoadingSlice';

import { configureStore } from '@reduxjs/toolkit'

export const makeStore = () => {
  return configureStore({
    reducer: {
      jobs: jobsReducer,
      tags: tagsReducer,
      iLoading: isLoadingReducer
  }})
}


export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']