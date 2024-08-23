import { configureStore, createSlice } from '@reduxjs/toolkit';

// Создание среза состояния для языка
const languageSlice = createSlice({
  name: 'language',
  initialState: 'en', // Начальное состояние
  reducers: {
    setLanguage: (state, action) => {
      // Поскольку Redux Toolkit использует Immer, вы можете изменить состояние напрямую
      return  state=action.payload; // Обновляем состояние на основе payload
    },
  },
});

export const { setLanguage } = languageSlice.actions;

// Создание хранилища Redux
const store = configureStore({
  reducer: {
    language: languageSlice.reducer,
  },
});

// Экспорт типа состояния для использования в компонентах
export type RootState = ReturnType<typeof store.getState>;

export default store;
