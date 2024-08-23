
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface LanguageState {
  value: string;
}


const languageSlice = createSlice({
  name: 'language',
  initialState: { value: 'en' } as LanguageState, 
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.value = action.payload; 
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;

