import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
    name : "movie",
    initialState : {
        moviename : '',
        runtime : '',
        releaseDate : '',
        genres : [],
        languages : [],
        posterImg : ''
    },
    reducers :{
        setMoviename:(state,action) => {
            state.moviename = action.payload
        },
        setRuntime:(state,action) => {
            state.runtime = action.payload
        },
        setReleaseDate:(state,action) => {
            state.releaseDate = action.payload
        },
        setGenres:(state,action) => {
            state.genres = action.payload
        },
        setLanguages:(state,action) => {
            state.languages = action.payload
        },
        setposterImg:(state,action) => {
            state.posterImg = action.payload
        }
    }
});

export const { setMoviename,setRuntime,setGenres,setLanguages,setposterImg,setReleaseDate } = movieSlice.actions;

export const viewMoviename = state => state.movie.moviename;
export const viewRuntime = state => state.movie.runtime;
export const viewGenres = state => state.movie.genres;
export const viewLanguages = state => state.movie.languages;
export const viewposterImg = state => state.movie.posterImg;
export const viewReleaseDate = state => state.movie.releaseDate;


export default movieSlice.reducer;