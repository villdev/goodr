import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URI } from "../../api";

export const getFeed = createAsyncThunk(
    "posts/getFeed",
    async() => {
        try {
            const response = await axios.get(`${BASE_URI}/posts/feed`);
            return response.data;
        } catch(error) {
            return error.response.data
        }
    }
)

export const createNewPost = createAsyncThunk(
    "posts/createNewPost",
    async(post, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASE_URI}/posts`, {post})
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const likePost = createAsyncThunk(
    "posts/likePost",
    async(postId, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASE_URI}/activity/like/${postId}`);
            return response.data
        } catch(error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const unLikePost = createAsyncThunk(
    "posts/unLikePost",
    async(postId, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${BASE_URI}/activity/like/${postId}`);
            return response.data
        } catch(error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async(postId, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${BASE_URI}/posts/${postId}`);
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getSinglePost = createAsyncThunk(
    "posts/getSinglePost",
    async(postId, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${BASE_URI}/posts/single/${postId}`)
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const postComment = createAsyncThunk(
    "posts/postComment",
    async({postId, comment}, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASE_URI}/activity/comment/${postId}`,{comment})
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteComment = createAsyncThunk(
    "posts/deleteComment",
    async({postId, commentID}, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${BASE_URI}/activity/comment/${postId}/${commentID}`)
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response.data)
        }
    }
)