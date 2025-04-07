import React, { useState,useEffect } from 'react';
import toast from "react-hot-toast"
import { frontend_assets } from '../assets/frontend_assets/assets'
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setscreenName, setShowtimings, viewScreenId, viewScreenname, viewShowtimings } from '../redux/screenSlice';
import { viewTheaterId } from '../redux/theaterSlice';
import Navbar from '../components/Navbar';
import { BASE_URL } from '../services/config';


const Screen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigation = (path) =>{
    navigate(path);
  }
  
  const [option,setOption] = useState();
  const screenname = useSelector(viewScreenname);
  const showtimings = useSelector(viewShowtimings);
  const theater_id = localStorage.getItem('theaterid')//useSelector(viewTheaterId);
  const updatescreenid = useSelector(viewScreenId);
  
  const generateTimeArray = ()=> {
    const times = [];
    let startTime = new Date();
    
    startTime.setHours(0, 5, 0, 0);
    let start = startTime.getHours();
    while (( start <= 23 && startTime.getMinutes() <= 55)) {
      const timeStr = startTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
      times.push({
        value: timeStr,   
        label: timeStr  
      });
      startTime.setMinutes(startTime.getMinutes() + 5);
        if(startTime.getHours() ==23 && startTime.getMinutes() == 55){
          const timeStr = startTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
          times.push({
            value: timeStr,   
            label: timeStr  
          });
          start = 24;
        }
    }
  
    return times;
  }
  
  useEffect(()=>{
    setOption(generateTimeArray())
    
   },[])

   const handleTimeChange = (selectedOptions) => {
       dispatch(setShowtimings(selectedOptions)); 
     };

    

   const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('screenname',screenname);
    formData.append('theaterid',theater_id);
    formData.append('screenid',updatescreenid);
    formData.append('showtimings',JSON.stringify(showtimings));
    axios.post(`${BASE_URL}/screens/add`,formData).then(res=>
      {
        setTimeout(() => {
          navigate('/screen/viewTheaterHome');  
        }, 2000)
        dispatch(setscreenName(''));
        dispatch(setShowtimings(''));
        toast.success('Screen added sucessfully')
      }).catch(err=>console.log(err))
  };

   

   

return (
  <>
  <Navbar/>
  <div className="max-w-2xl mx-auto bg-white p-8  shadow-lg mt-10">
    <div> <img src={frontend_assets.register_logo_img} className="lg:max-w-[85%] w-2/5 h-2/5 object-contain block mx-auto" alt="login-image" /></div>
    <div className="mb-4">
              <h3 className="text-3xl font-bold text-[#5c7eeb]">Add Screen</h3>
            </div>
    
      
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="username" className="block text-cyan-900 font-semibold">Screen name</label>
            <input
              type="text"
              id="theatername"
              name="theatername"
              onChange={(e)=>dispatch(setscreenName(e.target.value))}
              value = {screenname}
              className="w-full  text-xl  border-b border-gray-300 focus:border-[#5c7eeb] px-2 py-3 outline-none"
            />
            
          </div>
          

          <div className="mb-4">
            <label htmlFor="password" className="block text-cyan-900 font-semibold">Show times</label>
            <Select
                defaultValue={showtimings}
                onChange={handleTimeChange}
                options={option}
                className="w-full  text-xl  border-b border-gray-300 focus:border-[#5c7eeb] px-2 py-3 outline-none"
                isMulti
            />
          </div>

          
          <div className='mt-8  flex justify-start gap-4'>
            <button
              type="submit"
              
              className="w-2/5 ml-12 py-3  bg-gradient-to-b from-[#5c7eeb] to-[#24dedc] text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Save
            </button>
            <div
              
              className="w-2/5 px-24  py-3  bg-gradient-to-b from-[#5c7eeb] to-[#24dedc] text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={()=>{handleNavigation('/screen/viewTheaterHome')}}
            >
              Cancel
            </div>
          </div>
          </form>
       
     
    
  </div>
  </>
)
};

export default Screen;
