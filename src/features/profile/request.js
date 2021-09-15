import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URI } from '../../api';

export const getUserProfile = createAsyncThunk(
    'profile/getUserProfile',
    async (profileId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URI}/user/profile/${profileId}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    'profile/updateUserProfile',
    async (profileUpdates, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URI}/user/profile`, {
                profileUpdates
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateUserPassword = createAsyncThunk(
    'profile/updateUserPassword',
    async ({ oldPassword, newPassword }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URI}/user/account`, {
                oldPassword,
                newPassword
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
