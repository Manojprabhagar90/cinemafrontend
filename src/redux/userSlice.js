import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name : 'user',
    initialState : {
        username:'',
        email:'',
        password : '',
        confirmPassword : ''
    },
    reducers : {
        setUsername:(state,action) => {
            state.username = action.payload
        },
        setEmail:(state,action) => {
            state.email = action.payload
        },
        setPassword:(state,action) => {
            state.password = action.payload
        },
        setConfirmPassword:(state,action) => {
            state.confirmPassword = action.payload
        }
    }
})

export const { setUsername,setEmail,setPassword,setConfirmPassword } = userSlice.actions;

export const viewUsername = state => state.username;
export const viewEmail = state => state.email;
export const viewPassword = state => state.password;
export const viewConfirmPassword = state => state.confirmPassword;


export default userSlice.reducer;