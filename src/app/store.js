import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from '../features/auth/authSlice';
import postsReducers from '../features/posts/postsSlice';
import profileReducer from '../features/profile/profileSlice';
import exploreReducer from '../features/expolre/exploreSlice';
import notifyReducer from '../features/Notifications/notifySlice';

export const store = configureStore({
    reducer: {
        profile: profileReducer,
        auth: authUserReducer,
        posts: postsReducers,
        explore: exploreReducer,
        notify: notifyReducer
    }
});
