import { createSlice } from '@reduxjs/toolkit';
import {
    getUserProfile,
    updateUserProfile,
    updateUserPassword
} from './request';

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profileStatus: 'idle',
        profile: {},
        profilePosts: [],
        error: null
    },
    reducers: {
        resetProfile: (state) => {
            state.profile = {};
            state.profileStatus = 'idle';
        },
        addNewPostToProfile: (state, action) => {
            state.profilePosts.unshift(action.payload);
        },
        updateLocalUserProfile: (state, action) => {
            const profileUpdates = action.payload;
            state.profile = {
                ...state.profile,
                profileUpdates
            };
        },
        updatePostOnProfile: (state, action) => {
            const updatedPost = action.payload;
            let indexOfPostInProfile = state.profilePosts.findIndex(
                (post) => post._id === updatedPost._id
            );
            state.profilePosts[indexOfPostInProfile] = updatedPost;
        },
        removePostOnProfile: (state, action) => {
            const postId = action.payload;
            state.profilePosts = state.profilePosts.filter(
                (post) => post._id !== postId
            );
        }
    },
    extraReducers: {
        [getUserProfile.pending]: (state) => {
            state.profileStatus = 'loading';
        },
        [getUserProfile.fulfilled]: (state, action) => {
            const { profile, posts } = action.payload;
            state.profile = profile;
            state.profilePosts = posts;
            state.profileStatus = 'dataReceived';
        },
        [getUserProfile.rejected]: (state, action) => {
            state.error = action.payload;
            state.profileStatus = 'error';
        },

        [updateUserProfile.pending]: (state) => {
            state.profileStatus = 'updating';
        },
        [updateUserProfile.fulfilled]: (state, action) => {
            const { updatedUserProfile } = action.payload;
            state.profile = {
                ...state.profile,
                ...updatedUserProfile
            };
            state.profileStatus = 'dataReceived';
        },
        [updateUserProfile.rejected]: (state) => {
            state.profileStatus = 'error';
        },

        [updateUserPassword.pending]: (state) => {
            state.profileStatus = 'updating password';
        },
        [updateUserPassword.fulfilled]: (state) => {
            state.profileStatus = 'Fulfilled';
        },
        [updateUserPassword.pending]: (state) => {
            state.profileStatus = 'error';
        }
    }
});

export const {
    resetProfile,
    addNewPostToProfile,
    updatePostOnProfile,
    updateLocalUserProfile,
    removePostOnProfile
} = profileSlice.actions;

export default profileSlice.reducer;
