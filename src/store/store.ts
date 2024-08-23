// store.ts
import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './slices/languageSlice'; // Импорт редьюсера для языка

// Создание хранилища Redux
const store = configureStore({
  reducer: {
    language: languageReducer,
  },
});

// Экспорт типа состояния для использования в компонентах
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
