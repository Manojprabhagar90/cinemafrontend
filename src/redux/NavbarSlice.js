import { createSlice } from "@reduxjs/toolkit";


const navbarSlice = createSlice(
    {
        name : "navbar",
        initialState : {
            showCity : false,
            selectedCity : 'Chennai',
            cities : [],
            allcities : []
        },
        reducers : {
            setshowCity:(state,action) => {
                state.showCity = action.payload
            },
            setselectedCity:(state,action) => {
                state.selectedCity = action.payload
            },
            setcities:(state,action) => {
                state.cities = action.payload
            },
            setallcities:(state,action) => {
                state.allcities = action.payload
            },
        }
    }
);

export const { setshowCity,setselectedCity,setcities,setallcities } = navbarSlice.actions;

export const viewshowCity = state => state.navbar.showCity;
export const viewselectedCity = state => state.navbar.selectedCity;
export const viewcities = state => state.navbar.cities;
export const viewallcities = state => state.navbar.allcities;

export default navbarSlice.reducer;