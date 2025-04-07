import React, { useState,useEffect } from 'react';

import { frontend_assets } from '../assets/frontend_assets/assets'
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setScreenId, setScreenlist, setscreenName, setShowtimings, viewScreenlist, viewScreenname, viewShowtimings } from '../redux/screenSlice';
import { viewTheaterId } from '../redux/theaterSlice';
import Navbar from '../components/Navbar';
import { BASE_URL } from '../services/config';


const Screenlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const screenlist = useSelector(viewScreenlist);
  const theaterid = localStorage.getItem('theaterid')//useSelector(viewTheaterId)
  const handleNavigation = (path) =>{
    navigate(path);
  }

  const handleScreenMapNavigation = (screen,path) =>{
    dispatch(setScreenId(screen._id));
    localStorage.setItem('screenid', screen._id);
    navigate(path);
  }

  const handleUpdate = (screen,path) =>{
    dispatch(setScreenId(screen._id));
    const temp = screen.showtimes.map((itemValue)=>({
      value : itemValue,
      label : itemValue
    }))
    dispatch(setShowtimings(temp));
    dispatch(setscreenName(screen.screen_name));
    localStorage.setItem('screenid', screen._id);
    localStorage.setItem('showtimes', screen.showtimes);
    navigate(path);
  }

  useEffect(()=>{
    try {
   
      axios.get(`${BASE_URL}/screens/option/${theaterid}`).then(response=>{
          console.log(response.data);
          
          let Screens = response.data;
          dispatch(setScreenlist(Screens))
      }).catch(err=>console.log(err))
      } catch (error) {
          alert(error.response.data.message);
      }
  },[])
  

 
   

return (
  <>
  <Navbar/>
  <div className="max-w-2xl mx-auto bg-white p-8  shadow-lg mt-10">
    <div> <img src={frontend_assets.register_logo_img} className="lg:max-w-[85%] w-2/5 h-2/5 object-contain block mx-auto" alt="login-image" /></div>


    {
      screenlist.map((screen)=>{
        return(
            <div key={screen._id} className="mb-12 flex justify-between items-center">
                    <h3 className="text-3xl font-bold text-[#5c7eeb]" onClick={()=>handleUpdate(screen,'/screen/add')}>{screen.screen_name}</h3>
                    <button className="px-2 py-1 font-roboto border caret-transparent w-2/5  text-center  cursor-pointer bg-gradient-to-b from-[#5c7eeb] to-[#24dedc] text-white" onClick={()=>{handleScreenMapNavigation(screen,'/screen')}}>Add/Edit seat map</button>
                  </div>
              )
            })}

          <div
              
              className="w-2/5 ml-44 px-24  py-3  bg-gradient-to-b from-[#5c7eeb] to-[#24dedc] text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={()=>{handleNavigation('/screen/viewTheaterHome')}}
            >
              Back
            </div>
    
     
    
  </div>
  </>
)
};

export default Screenlist;
