import React, { useState,useEffect } from 'react';

import { frontend_assets } from '../assets/frontend_assets/assets'
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setScreenId, setscreenName, setShowtimings, viewScreenname, viewShowtimings } from '../redux/screenSlice';
import { viewTheaterId } from '../redux/theaterSlice';
import Navbar from '../components/Navbar';


const Screenhome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const theater_id = useSelector(viewTheaterId)
  const handleNavigation = (path) =>{
    dispatch(setScreenId(''));
    navigate(path);
  }
  

 
   

return (
  <>
  <Navbar/>
  <div className="max-w-2xl mx-auto bg-white p-8  shadow-lg mt-10">
    <div> <img src={frontend_assets.register_logo_img} className="lg:max-w-[85%] w-2/5 h-2/5 object-contain block mx-auto" alt="login-image" /></div>
    <div className="mb-12 flex justify-between items-center">
              <h3 className="text-3xl font-bold text-[#5c7eeb] cursor-pointer" onClick={()=>{handleNavigation('/screen/viewScreenlist')}}>Screens</h3>
              <button className="px-2 py-1 font-roboto border caret-transparent w-2/5  text-center  cursor-pointer bg-gradient-to-b from-[#5c7eeb] to-[#24dedc] text-white" onClick={()=>{handleNavigation('/screen/add')}}>Add new screen</button>
            </div>

    <div className="mb-4 flex justify-between items-center">
      <h3 className="text-3xl font-bold text-[#5c7eeb]">Shows</h3>
      <button className="px-2 py-1 font-roboto border caret-transparent w-2/5  text-center  cursor-pointer bg-gradient-to-b from-[#5c7eeb] to-[#24dedc] text-white"  onClick={()=>{handleNavigation('/show/add')}}>Add new shows</button>
    </div>
    
     
    
  </div>
  </>
)
};

export default Screenhome;
