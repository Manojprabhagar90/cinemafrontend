import React, { useState,useEffect } from 'react';

import { frontend_assets } from '../assets/frontend_assets/assets'
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from "react-hot-toast"
import { setMovieid, setScreenid, setShowdatetime, viewMovieid, viewScreenid, viewShowdatetime } from '../redux/showSlice';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import { viewTheaterId } from '../redux/theaterSlice';
import Navbar from '../components/Navbar';
import { BASE_URL } from '../services/config';


const Show = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigation = (path) =>{
    navigate(path);
  }

  const [selectedDate, setSelectedDate] = useState('');
  const [option,setOption] = useState();
  const [screenoption,setscreenOption] = useState();

  const [showoption,setshowOption] = useState();
  const [showtempoption,setshowtempOption] = useState([]);

  const movieid = useSelector(viewMovieid);
  const screenid = useSelector(viewScreenid);
  const showdatetime = useSelector(viewShowdatetime);
  const theaterid = localStorage.getItem('theaterid')//useSelector(viewTheaterId);
  

  let tempMovies = [];
  let tempMovieoption = [];
  let tempScreens = [];
  let tempScreensoption = [];
  let tempshowtimes = [];

  function convertTo24HourWithIntl(time12hr) {
    const date = new Date("1970-01-01 " + time12hr);  // Parse 12-hour time
    const formatter = new Intl.DateTimeFormat('en', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false  // Force 24-hour format
    });
    return formatter.format(date);  // Returns time in 24-hour format
  }

  const handleDateChange = (date) => {
      setSelectedDate(date);
      
    };

   

    const handleshowtimeChange = (selectedOptions) => {
        
        dispatch(setShowdatetime(selectedOptions)); 
      };

  useEffect(()=>{
    try {
         axios.get(`${BASE_URL}/movie/getallmovie`).then(response=>{
          tempMovies = response.data;
          tempMovieoption = tempMovies.map((movie) => ({
              value: movie._id,   
              label: movie.title  
            }));
            setOption(tempMovieoption);
            
         }).catch(err=>console.log(err))
     } catch (error) {
         alert(error.response.data.message);
     }



  try {
   
    axios.get(`${BASE_URL}/screens/option/${theaterid}`).then(response=>{
        tempScreens = response.data;
        tempScreensoption = tempScreens.map((screen) => ({
            value: screen._id,   
            label: screen.screen_name  
          }));

          tempshowtimes = tempScreens.map((screen) => {
            let showtemp = screen.showtimes; 
            let showtempoption = showtemp.map((item) => ({
              value: item,   
              label: item  
            }));
            return { [`${screen._id}`] :  showtempoption }
          });
          setshowtempOption(tempshowtimes);
          setscreenOption(tempScreensoption);
          
        }).catch(err=>console.log(err))
    } catch (error) {
        alert(error.response.data.message);
    }
    
   },[])

   useEffect(()=>{
      const index = showtempoption.findIndex(showtemp => showtemp.hasOwnProperty(screenid.value));
      let keypair = screenid.value;
      if(index>-1){
        setshowOption(showtempoption[index][keypair]);
      }
      
      
      
   },[screenid])

   const handlemovieChange = (selectedOptions) => {
       dispatch(setMovieid(selectedOptions)); 
     };
     const handlescreenChange = (selectedOptions) => {
      dispatch(setScreenid(selectedOptions)); 
    };

   const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('movieid',movieid.value);
    formData.append('screenid',screenid.value);
    formData.append('showtime',JSON.stringify(showdatetime));
    formData.append('showdate',selectedDate);
    
    axios.post(`${BASE_URL}/shows/add`,formData).then(res=>{
      setTimeout(() => {
        navigate('/screen/viewTheaterHome');  
      }, 2000)
      dispatch(setMovieid(''));
      dispatch(setScreenid(''));
      dispatch(setShowdatetime(''));
      setSelectedDate('');
      toast.success('Show added sucessfully')
    }).catch(err=>console.log(err))
  };

   

   

return (
  <>
  <Navbar/>
  <div className="max-w-2xl mx-auto mt-10 bg-white p-8  shadow-lg ">
    <div> <img src={frontend_assets.register_logo_img} className="lg:max-w-[85%] w-2/5 h-2/5 object-contain block mx-auto" alt="login-image" /></div>
    <div className="mb-4">
              <h3 className="text-3xl font-bold text-[#5c7eeb]">Add Show</h3>
            </div>
    
      
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
                      <label htmlFor="releasedate" className="block text-gray-700 font-semibold">Show Date</label>
                      <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      dateFormat="MM/dd/yyyy"
                      className="w-full  text-xl  border-b border-gray-300 focus:border-[#5c7eeb] px-2 py-3 outline-none"
                      required
                    />
                     
                    </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-cyan-900 font-semibold">Movie</label>
            <Select
                defaultValue={movieid}
                onChange={handlemovieChange}
                options={option}
                className="w-full  text-xl  border-b border-gray-300 focus:border-[#5c7eeb] px-2 py-3 outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-cyan-900 font-semibold">Screen</label>
            <Select
                defaultValue={screenid}
                onChange={handlescreenChange}
                options={screenoption}
                className="w-full  text-xl  border-b border-gray-300 focus:border-[#5c7eeb] px-2 py-3 outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-cyan-900 font-semibold">Show time</label>
            <Select
                defaultValue={showdatetime}
                options={showoption}
                onChange={handleshowtimeChange}
                className="w-full  text-xl  border-b border-gray-300 focus:border-[#5c7eeb] px-2 py-3 outline-none"
            />
          </div>

          
          <div className='mt-8 flex justify-start gap-4'>
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

export default Show;
