import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/redux/feature/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer, 
  },
});

// Export store type for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
