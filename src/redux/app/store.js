import { configureStore } from "@reduxjs/toolkit";
import HomepageSlice from "../HomepageSlice";
import navbarSlice from "../NavbarSlice";
import  movieSlice  from "../movieSlice";
import  theaterSlice  from "../theaterSlice";
import  screenSlice  from "../screenSlice";
import  showSlice  from "../showSlice";
import  loginuserSlice  from "../loginuserSlice";


const store = configureStore({
    reducer : {
        homepage : HomepageSlice,
        navbar : navbarSlice,
        movie : movieSlice,
        theater : theaterSlice,
        screen : screenSlice,
        show : showSlice,
        loginuser : loginuserSlice
    }
})

export default store;