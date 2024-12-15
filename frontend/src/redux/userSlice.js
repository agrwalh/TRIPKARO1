import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile, updateProfile } from '../services/Helper';



const initialState = {
    currentUser : null,
    error : null,
    loading : false,


};

const userSlice = createSlice({
    name:"user", 
    initialState, 
    reducers:{
        signInStart : (state) =>{
            state.loading = true
        },
        signInSuccess : (state, action)=>{
            console.log("User logged in: ", action.payload); 
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFaliure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
          }, 
        updateUserStart : (state)=>{
            state.loading = true;
        },
        updateUserSuccess : (state,action ) => {
            state.currentUser=action.payload;
            state.loading = false;
            state.error = null;
        }, 
        updateUserFaliure : (state, action)=>{
            state.error = action.payload;
            state.loading = false;
        }, 
        SignOutUserStart: (state) =>{
            state.loading = true;
        },
        SignOutUserSuccess: (state) =>{
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        SignOutUserFaliure: (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        }
    },
});

export const {signInStart, signInSuccess, signInFaliure, updateUserFaliure, updateUserStart, updateUserSuccess, deleteUserFaliure, deleteUserSuccess, deleteUserStart, SignOutUserStart, SignOutUserSuccess, SignOutUserFaliure} = userSlice.actions;
export default userSlice.reducer