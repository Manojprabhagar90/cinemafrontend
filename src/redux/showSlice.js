import { createSlice } from "@reduxjs/toolkit";


export const showSlice = createSlice({
    name : "show",
    initialState : {
        movieid : '',
        screenid : '',
        showdatetime : ''
    },
    reducers : {
        setMovieid : (state,action) => {
            state.movieid = action.payload
        },
        setScreenid : (state,action) => {
            state.screenid = action.payload
        },
        setShowdatetime : (state,action) => {
            state.showdatetime = action.payload
        }

    }
});

export const { setMovieid,setScreenid,setShowdatetime } = showSlice.actions;

export const viewMovieid = state => state.show.movieid;
export const viewScreenid = state => state.show.screenid;
export const viewShowdatetime = state => state.show.showdatetime;


export default showSlice.reducer;