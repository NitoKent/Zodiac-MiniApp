
import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './slices/languageSlice'; // Импорт редьюсера для языка


const store = configureStore({
  reducer: {
    language: languageReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
