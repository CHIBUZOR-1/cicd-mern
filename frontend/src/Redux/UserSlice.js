import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null;
        },
        updateProfilePic: (state, action) => { 
            if (state.user) { 
                state.user.profilePic = action.payload; 
            } 
        },
        updateProfilez: (state, action) => { 
            if (state.user) {  
                state.user.email = action.payload.email;
                state.user.username = action.payload.username;
            } 
        }
    },
});

export const { setUser, logout, updateProfilePic, updateProfilez } = userSlice.actions

export default userSlice.reducer;