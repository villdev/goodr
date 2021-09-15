import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URI } from '../../api';

export const getUserNotifications = createAsyncThunk(
    'notify.getUserNotifications',
    async () => {
        try {
            const response = await axios.get(`${BASE_URI}/activity/notify`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
);

export const notifySlice = createSlice({
    name: 'notify',
    initialState: {
        notifyStatus: 'idle',
        notifications: [],
        error: null
    },
    reducers: {},
    extraReducers: {
        [getUserNotifications.pending]: (state) => {
            state.notifyStatus = 'loading';
        },
        [getUserNotifications.fulfilled]: (state, action) => {
            const { allNotifications } = action.payload;
            state.notifications = allNotifications;
            state.notifyStatus = 'Fulfilled';
        },
        [getUserNotifications.pending]: (state, action) => {
            state.error = action.payload;
            state.notifyStatus = 'error';
        }
    }
});

export default notifySlice.reducer;
