import { createSlice } from '@reduxjs/toolkit';
import {
    getFeed,
    createNewPost,
    likePost,
    unLikePost,
    deletePost,
    getSinglePost,
    postComment,
    deleteComment
} from './request';

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        feedPosts: [],
        singlePost: null,
        post: null,
        postStatus: 'idle',
        error: null
    },
    reducers: {
        resetFeed: (state) => {
            state.feedPosts = [];
            state.singlePost = {};
            state.post = null;
            state.postStatus = 'idle';
            state.error = null;
        },
        updatePostOnFeed: (state, action) => {
            const updatedPost = action.payload;
            let indexOfPostInFeed = state.feedPosts.findIndex(
                (post) => post._id === updatedPost._id
            );
            state.feedPosts[indexOfPostInFeed] = updatedPost;
        }
    },
    extraReducers: {
        [getFeed.pending]: (state) => {
            state.postStatus = 'loading';
        },
        [getFeed.fulfilled]: (state, action) => {
            const { feedPosts } = action.payload;
            state.feedPosts = feedPosts;
            state.postStatus = 'feedLoaded';
        },
        [getFeed.rejected]: (state, action) => {
            state.error = action.payload;
            state.postStatus = 'error';
        },

        [createNewPost.pending]: (state) => {
            state.postStatus = 'posting';
        },
        [createNewPost.fulfilled]: (state, action) => {
            const { savedPost } = action.payload;
            state.feedPosts = [savedPost, ...state.feedPosts];
            state.postStatus = 'posted';
        },
        [createNewPost.rejected]: (state, action) => {
            state.error = action.payload;
            state.postStatus = 'error';
        },

        [getSinglePost.pending]: (state) => {
            state.postStatus = 'post-loading';
        },
        [getSinglePost.fulfilled]: (state, action) => {
            const { post } = action.payload;
            state.singlePost = post;
            state.postStatus = 'postLoaded';
        },
        [getSinglePost.rejected]: (state, action) => {
            state.error = action.payload;
            state.postStatus = 'error';
        },

        [likePost.pending]: (state) => {
            state.postStatus = 'liking post';
        },
        [likePost.fulfilled]: (state, action) => {
            const { postLiked } = action.payload;
            state.post = postLiked;
            state.postStatus = 'liked';
        },
        [likePost.rejected]: (state, action) => {
            state.error = action.payload;
            state.postStatus = 'error';
        },

        [unLikePost.pending]: (state) => {
            state.postStatus = 'unliking post';
        },
        [unLikePost.fulfilled]: (state, action) => {
            const { postUnLiked } = action.payload;
            state.post = postUnLiked;
            state.postStatus = 'unliked';
        },
        [unLikePost.rejected]: (state, action) => {
            state.error = action.payload;
            state.postStatus = 'error';
        },

        [deletePost.pending]: (state) => {
            state.postStatus = 'loading';
        },
        [deletePost.fulfilled]: (state, action) => {
            const { deletedPost } = action.payload;
            state.feedPosts = state.feedPosts.filter(
                (post) => post._id !== deletedPost._id
            );
            state.postStatus = 'Deleted';
        },
        [deletePost.rejected]: (state, action) => {
            state.error = action.payload;
            state.postStatus = 'rejected';
        },

        [postComment.pending]: (state) => {
            state.postStatus = 'commenting';
        },
        [postComment.fulfilled]: (state, action) => {
            const { commented } = action.payload;
            state.singlePost.comments.push(commented);
            state.postStatus = 'Fulfilled';
        },
        [postComment.rejected]: (state, action) => {
            state.error = action.payload;
            state.postStatus = 'rejected';
        },

        [deleteComment.pending]: (state) => {
            state.postStatus = 'loading';
        },
        [deleteComment.fulfilled]: (state, action) => {
            const { commentId } = action.payload;
            state.singlePost.comments = state.singlePost.comments.filter(
                (comment) => comment._id !== commentId
            );
            state.postStatus = 'Fulfilled';
        },
        [deleteComment.rejected]: (state, action) => {
            state.error = action.payload;
            state.postStatus = 'rejected';
        }
    }
});

export const { resetFeed, updatePostOnFeed } = postsSlice.actions;

export default postsSlice.reducer;
