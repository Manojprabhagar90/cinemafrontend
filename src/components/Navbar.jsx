import React, { useState,useEffect,useRef } from 'react'
import { frontend_assets } from "../assets/frontend_assets/assets";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon,ChevronUpIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import useClickOutside from '../hooks/useClickOutside';
import cityServices from '../services/cityServices';
import { useDispatch, useSelector } from 'react-redux';
import { viewshowCity,setshowCity, viewselectedCity,setselectedCity, viewcities,setcities, viewallcities, setallcities } from "../redux/NavbarSlice"
import { useNavigate } from 'react-router-dom';
import { setIsLoggedIn, setRole, viewIsLoggedIn, viewRole } from '../redux/loginuserSlice';
import { setfiltermovies, setmovies, setselectedGenres, setselectedLanguages } from '../redux/HomepageSlice';
import { BASE_URL } from '../services/config';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();
    const showCity = useSelector(viewshowCity);
    const selectedCity = useSelector(viewselectedCity);
    const cities = useSelector(viewcities);
    const allcities = useSelector(viewallcities);
    let tempCities = [];
    const navigate = useNavigate();

    const handleLoginNavigate = () =>{
      navigate("/user/login");
    }

    const handleBookingNavigate = () =>{
      navigate("/user/bookings");
    }

    const handleLogoutNavigate = () =>{
      dispatch(setIsLoggedIn(false));
      dispatch(setRole(''));
      localStorage.setItem('isLoggedIn', false);
      localStorage.setItem('role', '');
      navigate("/");
    }

    useEffect(()=>{
     try {
          axios.get(`${BASE_URL}/city/getallcity`).then(response=>{
            tempCities = response.data.filter(item=> item != selectedCity);
            dispatch(setcities(tempCities));
            dispatch(setallcities(response.data));
          }).catch(err=>console.log(err))
      } catch (error) {
          alert(error.response.data.message);
      }
    },[])

    useEffect(()=>{
      tempCities = allcities.filter(item=> item != selectedCity)
      dispatch(setcities(tempCities));
      try {
        const today = new Date(); 
        axios.get(`${BASE_URL}/movie/getallmovie/${selectedCity}/${new Date(today)}`).then(response=>{
            dispatch(setmovies(response.data));
            dispatch(setfiltermovies(response.data));
           dispatch(setselectedGenres([]));
           dispatch(setselectedLanguages([]));
         }).catch(err=>console.log(err))
      } catch (error) {
           alert(error.response.data.message);
      }
     },[selectedCity])

    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };

      const handleChangecity = (city) =>{
        dispatch(setselectedCity(city));
        resetAll();
      }

      const home = () =>{
        const userRole = localStorage.getItem('role');
        console.log(userRole);
        
          if(userRole == "super_admin"){
            navigate('/viewAdminHome');
          }else if(userRole == "theater_admin"){
              navigate('/screen/viewTheaterHome');
          }else{
            navigate('/');
          }
      }
      

      const resetAll = () => {
        dispatch(setshowCity(false));
      };
      const ref = useRef(null);
      useClickOutside(ref, () => resetAll());

      const IsLoggedIn = useSelector(viewIsLoggedIn);
      const role = useSelector(viewRole);

  return (
    <div>
      <nav className="bg-white text-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex justify-center items-center gap-6">
          <p className='text-2xl  caret-transparent cursor-pointer font-bold text-black' onClick={()=>home()}>MOVIE<span className='text-orange-500'>PAL</span></p>
          
        </div>

        {((JSON.parse(IsLoggedIn) && role == "User")) && <div className='cursor-pointer' onClick={handleBookingNavigate}>My Bookings</div>}
        {/* Desktop Navbar */}
        <div className="md:flex space-x-6  caret-transparent">
        
          {(!JSON.parse(IsLoggedIn) || (JSON.parse(IsLoggedIn) && role == "User")) && <div className='flex justify-between items-center relative'><p className='cursor-pointer pr-2' onClick={()=>dispatch(setshowCity(!showCity))}>{selectedCity}</p> {showCity ? <ChevronUpIcon aria-hidden="true" className="-mr-1 cursor-pointer size-5 text-gray-400" onClick={()=>dispatch(setshowCity(!showCity))}/> : <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400 cursor-pointer" onClick={()=>dispatch(setshowCity(!showCity))}/>}
            {showCity && <div ref={ref} className='max-h-72 overflow-y-scroll overflow-x-hidden w-48 bg-white absolute mt-80 cursor-pointer z-10'>
                
           { cities.map((city,index)=>{
            return(<>
            <div key={index} onClick={()=>handleChangecity(city)} className='border-b border-solid border-gray-200 w-48 p-2 text-center'>{city}</div>
            </>)
           })
           }               
            </div>}
          </div>}

          
          
          {!JSON.parse(IsLoggedIn) && <button className="px-3 py-1 font-roboto border caret-transparent w-1/2 border-red-500 text-center  cursor-pointer  bg-tomato text-white" onClick={handleLoginNavigate}>Sign In
          </button>}

          {JSON.parse(IsLoggedIn)  && role == "User" && <button className="px-3 py-1 font-roboto border caret-transparent w-full border-red-500 text-center  cursor-pointer  bg-tomato text-white" onClick={handleLogoutNavigate}>Sign Out
          </button>}
          {JSON.parse(IsLoggedIn)  && role != "User" && <button className="px-3 py-1 font-roboto border caret-transparent w-full  text-center  cursor-pointer  bg-gradient-to-b from-[#5c7eeb] to-[#24dedc]  text-white" onClick={handleLogoutNavigate}>Sign Out
          </button>}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="flex flex-col items-center space-y-4 p-4 bg-gray-800">
          <a href="#" className="text-white hover:text-gray-400">Home</a>
          <a href="#" className="text-white hover:text-gray-400">Movies</a>
          <a href="#" className="text-white hover:text-gray-400">Events</a>
          <a href="#" className="text-white hover:text-gray-400">Offers</a>
          <a href="#" className="text-white hover:text-gray-400">Sign In</a>
        </div>
      </div>

    </nav>
    </div>
  )
}

export default Navbar
