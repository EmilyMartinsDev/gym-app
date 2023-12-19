import { configureStore } from "@reduxjs/toolkit";
import wizardReducer from './reducers/wizardReducer'

export const store = configureStore({
  reducer: {
    wizard: wizardReducer
  },

});

export type RootRedux = ReturnType<typeof store.getState>;