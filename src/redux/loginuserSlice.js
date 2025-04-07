import { createSlice } from "@reduxjs/toolkit";

export const loginuserSlice = createSlice({
    name : 'loginuser',
    initialState : {
        isLoggedIn : localStorage.getItem('isLoggedIn'),
        role : localStorage.getItem('role'),
        loginUser : ''
    },
    reducers : {
        setIsLoggedIn : (state,action) =>{
            state.isLoggedIn = action.payload
        },
        setRole : (state,action) =>{
            state.role = action.payload
        },
        setLoginuser : (state,action) =>{
            state.loginUser = action.payload
        }
    }
});

export const { setIsLoggedIn,setRole,setLoginuser } = loginuserSlice.actions;

export const viewIsLoggedIn = state => state.loginuser.isLoggedIn;
export const viewRole = state => state.loginuser.role;
export const viewLoginuser = state => state.loginuser.loginUser;

export default loginuserSlice.reducer;