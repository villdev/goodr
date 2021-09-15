import { createSlice } from '@reduxjs/toolkit';
import {
    loginUserWithCredentials,
    signupUserWithCredentials,
    initializeAuthUser,
    followUser,
    unFollowUser
} from './request';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userToken: JSON.parse(localStorage?.getItem('authUserToken')) || null,
        userId: JSON.parse(localStorage?.getItem('authUserId')) || null,
        isAuthenticated:
            JSON.parse(localStorage?.getItem('isAuthenticated')) || null,
        status: JSON.parse(localStorage?.getItem('authUserToken'))
            ? 'tokenReceived'
            : 'idle',
        user: null,
        error: null
    },
    reducers: {
        logOutUser: () => {
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('authUserToken');
            localStorage.removeItem('authUserId');
            return {
                status: 'idle',
                userToken: null,
                userId: null,
                isAuthenticated: false,
                user: null
            };
        },
        resetStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: {
        [loginUserWithCredentials.pending]: (state) => {
            state.status = 'loading';
        },
        [loginUserWithCredentials.fulfilled]: (state, action) => {
            const { token, user } = action.payload;
            state.userToken = token;
            state.userId = user._id;
            state.isAuthenticated = true;
            localStorage.setItem('authUserToken', JSON.stringify(token));
            localStorage.setItem('authUserId', JSON.stringify(user._id));
            localStorage.setItem('isAuthenticated', JSON.stringify(true));
            state.status = 'tokenReceived';
        },
        [loginUserWithCredentials.rejected]: (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        },
        [signupUserWithCredentials.pending]: (state) => {
            state.status = 'loading';
        },
        [signupUserWithCredentials.fulfilled]: (state, action) => {
            const { token, user } = action.payload;
            state.userToken = token;
            state.userId = user._id;
            state.isAuthenticated = true;
            localStorage.setItem('authUserToken', JSON.stringify(token));
            localStorage.setItem('authUserId', JSON.stringify(user._id));
            localStorage.setItem('isAuthenticated', JSON.stringify(true));
            state.status = 'tokenReceived';
        },
        [signupUserWithCredentials.rejected]: (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        },
        [initializeAuthUser.pending]: (state) => {
            state.status = 'loading';
        },
        [initializeAuthUser.fulfilled]: (state, action) => {
            const { profile } = action.payload;
            state.user = profile;
            state.status = 'profileLoaded';
        },
        [initializeAuthUser.rejected]: (state, action) => {
            state.error = action.payload;
            state.status = 'error';
        },

        [followUser.pending]: (state) => {
            state.status = 'loadinguser';
        },
        [followUser.fulfilled]: (state, action) => {
            const { followedId } = action.payload;
            state.user.following.push(followedId);
            state.status = 'Fulfilled';
        },
        [followUser.rejected]: (state, action) => {
            state.error = action.payload;
            state.status = 'rejected';
        },
        [unFollowUser.pending]: (state) => {
            state.status = 'loadinguser';
        },
        [unFollowUser.fulfilled]: (state, action) => {
            const { unfollowedId } = action.payload;
            state.user.following.splice(
                state.user.following.indexOf(unfollowedId),
                1
            );
            state.status = 'Fulfilled';
        },
        [unFollowUser.rejected]: (state, action) => {
            state.error = action.payload;
            state.status = 'rejected';
        }
    }
});

export const { logOutUser, resetStatus } = authSlice.actions;

export default authSlice.reducer;
