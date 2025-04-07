import { createSlice } from "@reduxjs/toolkit";


export const theaterSlice = createSlice({
    name : 'theater',
    initialState : {
        theaterId : '',
        screenId : '',
        showId : '',
        theatername:'',
        theaterownername:'',
        city:'',
        email:'',
        payprice : '',
        theaterlist : [],
        theaterObj : '',
        screen : '',
        show : ''
    },
    reducers : {
        setTheaterId:(state,action) => {
            state.theaterId = action.payload
        },
        setScreenId:(state,action) => {
            state.screenId = action.payload
        },
        setShowId:(state,action) => {
            state.showId = action.payload
        },
        setTheaterName:(state,action) => {
            state.theatername = action.payload
        },
        setTheaterOwnerName:(state,action) => {
            state.theaterownername = action.payload
        },
        setCity:(state,action) => {
            state.city = action.payload
        },
        setEmail:(state,action) => {
            state.email = action.payload
        },
        setTheaterList:(state,action) => {
            state.theaterlist = action.payload
        },
        setPayprice:(state,action) => {
            state.payprice = action.payload
        },
        setTheater:(state,action) => {
            state.theaterObj = action.payload
        },
        setScreen:(state,action) => {
            state.screen = action.payload
        },
        setShow:(state,action) => {
            state.show = action.payload
        }
    }
})

export const { setPayprice,setTheaterName,setCity,setEmail,setTheaterOwnerName,setTheaterId,setTheaterList,setScreenId,setShowId,setTheater,setScreen,setShow } = theaterSlice.actions;

export const viewTheaterName = state => state.theater.theatername;
export const viewTheaterOwnerName = state => state.theater.theaterownername;
export const viewCity = state => state.theater.city;
export const viewEmail = state => state.theater.email;
export const viewTheaterId = state => state.theater.theaterId;
export const viewTheaterList = state => state.theater.theaterlist;
export const viewScreenId = state => state.theater.screenId;
export const viewShowId = state => state.theater.showId;
export const viewPayprice = state => state.theater.payprice;
export const viewTheater = state => state.theater.theaterObj;
export const viewScreen = state => state.theater.screen;
export const viewShow = state => state.theater.show;



export default theaterSlice.reducer;