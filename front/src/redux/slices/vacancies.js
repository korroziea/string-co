import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchVacancies = createAsyncThunk('/resume/fetchVacancies', async () => {
    const { data } = await axios.get('/resume');
    return data;
});

export const fetchTags = createAsyncThunk('/resume/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data;
});

export const fetchRemoveVacancy = createAsyncThunk('/resume/fetchRemoveVacancy', async (id) => {
    axios.delete(`/resume/${id}`);
});

export const fetchPostsByTags = createAsyncThunk('/resume/fetchPostsByTags', async (name) => {
    //axios.get(`/tags/${name}`);
    const { data } = await axios.get(`/tags/${name}`);
    return data;
});

export const fetchSendApplication = createAsyncThunk('/resume/fetchSendApplication', async (params) => {
    const { data } = await axios.post(`/resume/application`, params);
    return data;
});

// export const fetchLiveVacancy = createAsyncThunk('/vacancies/fetchLiveVacancy', async (id, params) => {
//     const { data } = await axios.post(`/vacancies/${id}/resume`, params);
//     return data;
// });

const initialState = {
    vacancies: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },
};

const vacanciesSlice = createSlice({
    name: 'vacancies',
    initialState,
    reducers: {
        // send: (state) => {
        //     state.data = null;
        // }
    },
    extraReducers: {

        // Получение вакансии
        [fetchVacancies.pending]: (state) => {
            state.vacancies.items = [];
            state.vacancies.status = 'loading';
        },
        [fetchVacancies.fulfilled]: (state, action) => {
            state.vacancies.items = action.payload; 
            state.vacancies.status = 'loaded';
        },
        [fetchVacancies.rejected]: (state) => {
            state.vacancies.items = []; 
            state.vacancies.status = 'error';
        },

        // Получение тэгов
        [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload; 
            state.tags.status = 'loaded';
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = []; 
            state.tags.status = 'error';
        },

        // Удаление вакансии
        [fetchRemoveVacancy.pending]: (state, action) => {
            state.vacancies.items = state.vacancies.items.filter(obj => obj._id !== action.meta.arg); // 4 hour
        },

        // Получение вакансий по тэгам
        [fetchPostsByTags.pending]: (state) => {
            state.vacancies.items = [];
            state.vacancies.status = 'loading';
        },
        [fetchPostsByTags.fulfilled]: (state, action) => {
            state.vacancies.items = action.payload; 
            state.vacancies.status = 'loaded';
        },
        [fetchPostsByTags.rejected]: (state) => {
            state.vacancies.items = []; 
            state.vacancies.status = 'error';
        },

        // // Отправка сообщения пользователю
        // [fetchSendApplication.pending]: (state) => {
        //     state.vacancies.items = [];
        //     state.vacancies.status = 'loading';
        // },
        // [fetchSendApplication.fulfilled]: (state, action) => {
        //     state.vacancies.items = action.payload; 
        //     state.vacancies.status = 'loaded';
        // },
        // [fetchSendApplication.rejected]: (state) => {
        //     state.vacancies.items = []; 
        //     state.vacancies.status = 'error';
        // },
    }
});

export const selectIsLiveResume = state => Boolean(state.vacancies.data);

export const vacanciesReducer = vacanciesSlice.reducer;

//export const { send } = vacanciesSlice.actions;