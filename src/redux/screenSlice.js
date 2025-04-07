import { createSlice } from "@reduxjs/toolkit";

export const screenSlice = createSlice({
    name : "screen",
    initialState:{
        screenId : '',
        screenName : '',
        showtimings : [],
        screenlist : []
    },
    reducers : {
        setscreenName : (state,action)=>{
            state.screenName = action.payload;
        },
        setShowtimings : (state,action) =>{
            state.showtimings = action.payload;
        },
        setScreenlist : (state,action) =>{
            state.screenlist = action.payload;
        },
        setScreenId : (state,action) =>{
            state.screenId = action.payload;
        }
    }
});

export const { setscreenName,setShowtimings,setScreenlist,setScreenId } = screenSlice.actions;

export const viewScreenname = state => state.screen.screenName;
export const viewShowtimings = state => state.screen.showtimings;
export const viewScreenlist = state => state.screen.screenlist;
export const viewScreenId = state => state.screen.screenId;

export default screenSlice.reducer