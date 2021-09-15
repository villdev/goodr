import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URI } from '../../api';

export const loginUserWithCredentials = createAsyncThunk(
    'auth/loginUserWithCredentials',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URI}/user/login`, {
                email,
                password
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const signupUserWithCredentials = createAsyncThunk(
    'auth/signupUserWithCredentials',
    async ({ name, username, email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URI}/user/signup`, {
                name,
                username,
                email,
                password
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const initializeAuthUser = createAsyncThunk(
    'auth/initializeAuthUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URI}/user/profile/${userId}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const followUser = createAsyncThunk(
    'auth/followUser',
    async (profileId, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URI}/activity/follow/${profileId}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const unFollowUser = createAsyncThunk(
    'auth/unFollowUser',
    async (profileId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${BASE_URI}/activity/follow/${profileId}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
