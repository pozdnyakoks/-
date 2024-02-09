
import { configureStore } from '@reduxjs/toolkit';
// import jobReducer from './slices/jobSlice';
import jobsReducer from './slices/jobsSlice';
import tagsReducer from './slices/tagsSlice';
// import filteredJobsReducer from './slices/filteredJobsSlice';
// import currentPageReducer from './slices/currentPageSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: {
    // job: jobReducer,
    jobs: jobsReducer,
    tags: tagsReducer,
    // currentPage: currentPageReducer,
    // filteredJobs: filteredJobsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
