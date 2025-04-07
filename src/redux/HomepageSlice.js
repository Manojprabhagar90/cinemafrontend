import { createSlice } from "@reduxjs/toolkit";

export const HomepageSlice = createSlice({
        name : "homepage",
        initialState : {
            showLanguageFilter : false,
            showGenresFilter : false,
            languages : [],
            genres : [],
            selectedGenres : [],
            selectedLanguages : [],
            movies : [],
            filtermovies : [],
            movie : {},
            bookings : [],
            booking : {}
        },
        reducers : {
            setshowLanguageFilter:(state,action) => {
                state.showLanguageFilter = action.payload
            },
            setshowGenresFilter:(state,action) => {
                state.showGenresFilter = action.payload
            },
            setlanguages:(state,action) => {
                state.languages = action.payload
            },
            setgenres:(state,action) => {
                state.genres = action.payload
            },
            setselectedGenres:(state,action) => {
                if(Array.isArray(action.payload)){
                    state.selectedGenres = [];
                }else{
                    if(state.selectedGenres.includes(action.payload)){
                    state.selectedGenres = state.selectedGenres.filter(
                            (genre) => genre != action.payload
                        );
                    }else{
                        state.selectedGenres.push(action.payload)
                    }
                }
            },
            setselectedLanguages:(state,action) => {
                if(Array.isArray(action.payload)){
                    state.selectedLanguages = [];
                }else{
                    if(state.selectedLanguages.includes(action.payload)){
                        state.selectedLanguages = state.selectedLanguages.filter(
                            (language) => language != action.payload
                        );
                    }else{
                        state.selectedLanguages.push(action.payload)
                    }
                }
            },
            setmovies:(state,action) => {
                state.movies = action.payload
            },
            setfiltermovies:(state,action) => {
                state.filtermovies = action.payload
            },
            setmovie:(state,action) => {
                state.movie = action.payload
            },
            setBookings:(state,action) => {
                state.bookings = action.payload
            },
            setBooking:(state,action) => {
                state.booking = action.payload
            }
        }
});

export const { setfiltermovies,setgenres,setlanguages,setmovies,setselectedGenres,setselectedLanguages,setshowGenresFilter,setshowLanguageFilter,setmovie,setBookings,setBooking } = HomepageSlice.actions;

export const viewshowLanguageFilter = state => state.homepage.showLanguageFilter;
export const viewshowGenresFilter = state => state.homepage.showGenresFilter;
export const viewselectedLanguages = state => state.homepage.selectedLanguages;
export const viewselectedGenres = state => state.homepage.selectedGenres;
export const viewmovies = state => state.homepage.movies;
export const viewgenres = state => state.homepage.genres;
export const viewfiltermovies = state => state.homepage.filtermovies;
export const viewlanguages = state => state.homepage.languages;
export const viewmovie = state => state.homepage.movie;
export const viewshow = state =>state.homepage.show;
export const viewBookings = state =>state.homepage.bookings;
export const viewBooking = state =>state.homepage.booking;

export default HomepageSlice.reducer;