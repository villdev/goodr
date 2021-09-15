import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URI } from "../../api";

export const getAllUserProfiles = createAsyncThunk(
    "explore/getAllUserProfiles",
    async() => {
        try {
            const response = await axios.get(`${BASE_URI}/user/profiles`);
            return response.data
        } catch(error) {
            return error.response.data
        }
    }
)

export const exploreSlice = createSlice({
    name: "explore",
    initialState: {
        allProfiles: [],
        exploreStatus: "idle"
    },
    reducers: {},
    extraReducers: {
        [getAllUserProfiles.pending]: (state) => {
            state.exploreStatus = "loading"
        },
        [getAllUserProfiles.fulfilled]: (state, action) => {
            const { allUsers } = action.payload;
            state.allProfiles = allUsers;
            state.exploreStatus = "dataReceived"
        },
        [getAllUserProfiles.rejected]: (state) => {
            state.exploreStatus = "error"
        }
    }
})

export default exploreSlice.reducer;