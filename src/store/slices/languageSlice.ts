// slices/languageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Тип для состояния языка
interface LanguageState {
  value: string;
}

// Создание среза состояния для языка
const languageSlice = createSlice({
  name: 'language',
  initialState: { value: 'en' } as LanguageState, // Начальное состояние
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.value = action.payload; 
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;

