import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './slices/charactersSlice';

const store = configureStore({
    reducer: {
        characters: charactersReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
