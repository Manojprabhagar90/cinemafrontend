import React, { useState,useEffect } from 'react';
import toast from "react-hot-toast"
import { frontend_assets } from '../assets/frontend_assets/assets'
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import { setGenres, setLanguages, setMoviename, setposterImg, setReleaseDate, setRuntime, viewGenres, viewLanguages, viewMoviename, viewposterImg, viewReleaseDate, viewRuntime } from '../redux/movieSlice';
import Navbar from '../components/Navbar';
import { BASE_URL } from '../services/config';


const Movie = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigation = (path) =>{
    navigate(path);
  }

  const [selectedGenres,setselectedGenres] = useState();
  const [option,setOption] = useState();
  const [languageOption,setlanguageOption] = useState();
  const [selectedLanguages,setselectedLanguages] = useState();
  let tempGenres = [];
  let tempGenresoption = [];
  let tempLanguages = [];
  let tempLanguagesoption = [];

  const moviename = useSelector(viewMoviename);
  const runtime = useSelector(viewRuntime);
  const releasedate = useSelector(viewReleaseDate);
  const genres = useSelector(viewGenres);
  const languages = useSelector(viewLanguages);
  const posterImg = useSelector(viewposterImg)
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(()=>{
    try {
         axios.get(`${BASE_URL}/genre/getallgenres`).then(response=>{
           tempGenres = response.data;
           tempGenresoption = tempGenres.map((name) => ({
              value: name,   
              label: name  
            }));
            setOption(tempGenresoption);
            
         }).catch(err=>console.log(err))
     } catch (error) {
         alert(error.response.data.message);
     }
     try {
      axios.get(`${BASE_URL}/language/getalllanguage`).then(response=>{
        tempLanguages = response.data;
        tempLanguagesoption = tempLanguages.map((name) => ({
           value: name,   
           label: name  
         }));
         setlanguageOption(tempLanguagesoption);
      }).catch(err=>console.log(err))
    } catch (error) {
        alert(error.response.data.message);
    }
   },[])

   const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
          dispatch(setposterImg(file));
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    
    if (date) {
      dispatch(setReleaseDate(date.toISOString()));  
    }
  };

  const handleGenreChange = (selectedOptions) => {
    
    dispatch(setGenres(selectedOptions)); 
  };

  const handleLanguageChange = (selectedOptions) => {
    
    dispatch(setLanguages(selectedOptions)); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('moviename',moviename);
    formData.append('runtime',runtime);
    formData.append('releasedate',releasedate);
    formData.append('genres',JSON.stringify(genres));
    formData.append('languages',JSON.stringify(languages));
    formData.append('file',posterImg);
   
    axios.post(`${BASE_URL}/movie/add`,formData).then(res=>
    {
      setTimeout(() => {
        navigate('/viewAdminHome');  
      }, 2000)
      dispatch(setMoviename(''));
      dispatch(setRuntime(''));
      dispatch(setReleaseDate(''));
      dispatch(setGenres(''));
      dispatch(setLanguages(''))
      toast.success('Movie added sucessfully')
    }
    ).catch(err=>console.log(err))
  };
   

return (
  <>
  <Navbar/>
  <div className="max-w-2xl mx-auto bg-white p-8 mt-10  shadow-lg ">
    <div> <img src={frontend_assets.register_logo_img} className="lg:max-w-[85%] w-2/5 h-2/5 object-contain block mx-auto" alt="login-image" /></div>
    <div className="mb-4">
              <h3 className="text-3xl font-bold text-[#5c7eeb]">Add Movie</h3>
            </div>
    
      
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="moviename" className="block text-gray-700 font-semibold">Movie Name</label>
            <input
              type="text"
              id="moviename"
              name="moviename"
              placeholder="Enter movie name"
              onChange={(e)=>dispatch(setMoviename(e.target.value))}
              value = {moviename}
              className="w-full  text-xl  border-b border-gray-300 focus:border-[#5c7eeb] px-2 py-3 outline-none"
            />
            
          </div>

          <div className="mb-4">
            <label htmlFor="runtime" className="block text-gray-700 font-semibold">Run time(In mins)</label>
            <input
              type="text"
              id="runtime"
              name="runtime"
              placeholder="Enter run time"
              onChange={(e)=>dispatch(setRuntime(e.target.value))}
              value = {runtime}
              className="w-full  text-xl  border-b border-gray-300 focus:border-[#5c7eeb] px-2 py-3 outline-none"
            />
            
          </div>

          <div className="mb-4">
            <label htmlFor="releasedate" className="block text-gray-700 font-semibold">Release Date</label>
            <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            className="w-full  text-xl  border-b border-gray-300 focus:border-[#5c7eeb] px-2 py-3 outline-none"
            required
          />
           
          </div>

          <div className="mb-4">
            <label htmlFor="genres" className="block text-gray-700 font-semibold">Genres</label>
            <Select
                defaultValue={genres}
                onChange={handleGenreChange}
                options={option} isMulti
            />
          </div>

          <div className="mb-6">
            <label htmlFor="languages" className="block text-gray-700 font-semibold">Languages</label>
            <Select
                defaultValue={languages}
                onChange={handleLanguageChange}
                options={languageOption} isMulti
            />
            
          </div>

          <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Movie poster
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
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

export default Movie;
