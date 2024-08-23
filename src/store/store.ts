import { configureStore, createSlice, } from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'language',
  initialState: 'en', 
  reducers: {
    setLanguage: (state, action) => {
      
      return state = action.payload; 
    },
  },
});

export const { setLanguage } = languageSlice.actions;


const store = configureStore({
  reducer: {
    language: languageSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
