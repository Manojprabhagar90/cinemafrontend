import React, { useState,useEffect } from 'react';
import toast from "react-hot-toast"
import { frontend_assets } from '../assets/frontend_assets/assets'
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCity, setEmail, setTheaterName, setTheaterOwnerName, viewCity, viewEmail, viewTheaterName, viewTheaterOwnerName } from '../redux/theaterSlice';
import Navbar from '../components/Navbar';
import { BASE_URL } from '../services/config';


const Theater = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigation = (path) =>{
    navigate(path);
  }

  const [selectedCities,setselectedCities] = useState();
  const [option,setOption] = useState();
  const theatername = useSelector(viewTheaterName);
  const theaterownername = useSelector(viewTheaterOwnerName);
  const city = useSelector(viewCity);
  const email = useSelector(viewEmail);

  let tempCities = [];
  let tempCitiesoption = [];
  
  useEffect(()=>{
    try {
         axios.get(`${BASE_URL}/city/getallcity`).then(response=>{
          tempCities = response.data;
          tempCitiesoption = tempCities.map((name) => ({
              value: name,   
              label: name  
            }));
            setOption(tempCitiesoption);
            
         }).catch(err=>console.log(err))
     } catch (error) {
         alert(error.response.data.message);
     }
    
   },[])

   const handleCityChange = (selectedOptions) => {
       dispatch(setCity(selectedOptions)); 
     };

   const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('theatername',theatername);
    formData.append('theaterownername',theaterownername);
    formData.append('city',JSON.stringify(city));
    formData.append('email',email);
    axios.post(`${BASE_URL}/theater/add`,formData).then(res=>{
      setTimeout(() => {
        navigate('/viewAdminHome');  
      }, 2000)
      dispatch(setCity(''));
      dispatch(setTheaterName(''));
      dispatch(setTheaterOwnerName(''));
      dispatch(setEmail(''));
      toast.success('Theater added sucessfully')
    }).catch(err=>console.log(err))
  };

   

   

return (
  <>
  <Navbar/>
  <div className="max-w-2xl mx-auto bg-white p-8 mt-10 shadow-lg ">
    <div> <img src={frontend_assets.register_logo_img} className="lg:max-w-[85%] w-2/5 h-2/5 object-contain block mx-auto" alt="login-image" /></div>
    <div className="mb-4">
              <h3 className="text-3xl font-bold text-[#5c7eeb]">Add theater</h3>
            </div>
    
      
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="username" className="block text-cyan-900 font-semibold">Theater name</label>
            <input
              type="text"
              id="theatername"
              name="theatername"
              onChange={(e)=>dispatch(setTheaterName(e.target.value))}
              value = {theatername}
              className="w-full  text-xl  border-b border-gray-300 focus:border-[#5c7eeb] px-2 py-3 outline-none"
            />
            
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-cyan-900 font-semibold">Owner name</label>
            <input
              type="text"
              id="theatername"
              name="theatername"
              onChange={(e)=>dispatch(setTheaterOwnerName(e.target.value))}
              value = {theaterownername}
              className="w-full  text-xl  border-b border-gray-300 focus:border-[#5c7eeb] px-2 py-3 outline-none"
            />
            
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-cyan-900 font-semibold">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={(e)=>dispatch(setEmail(e.target.value))}
              value = {email}
              className="w-full  text-xl  border-b border-gray-300 focus:border-[#5c7eeb] px-2 py-3 outline-none"
            />
            
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-cyan-900 font-semibold">City</label>
            <Select
                defaultValue={city}
                onChange={handleCityChange}
                options={option}
                className="w-full  text-xl  border-b border-gray-300 focus:border-[#5c7eeb] px-2 py-3 outline-none"
            />
          </div>

          
          <div className='mt-8 flex justify-start gap-4'>
            <button
              type="submit"
              
              className="w-2/5  ml-12 py-3  bg-gradient-to-b from-[#5c7eeb] to-[#24dedc] text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Save
            </button>
            <div
              
              className="w-2/5 px-24  py-3  bg-gradient-to-b from-[#5c7eeb] to-[#24dedc] text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={()=>{handleNavigation('/viewAdminHome')}}
            >
              Cancel
            </div>
          </div>
          </form>
       
     
    
  </div>
  </>
)
};

export default Theater;
