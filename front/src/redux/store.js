import { configureStore } from '@reduxjs/toolkit';
import { vacanciesReducer } from './slices/vacancies';
import { authReducer } from './slices/auth';

const store = configureStore({
    reducer: {
        vacancies: vacanciesReducer,
        auth: authReducer,
    }
});

export default store;