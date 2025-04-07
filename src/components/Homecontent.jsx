import React,{ useState,useEffect } from 'react'
import { FaAngleDown,FaAngleUp,FaRegStar,FaStar  } from "react-icons/fa6";
import { frontend_assets } from '../assets/frontend_assets/assets';
import axios from 'axios';
import { BASE_URL, UPLOADS_URL } from '../services/config';
import { useNavigate } from 'react-router-dom'

import data from '../data.json';
import Navbar from './Navbar';
import Sliderad from './Sliderad';
import { useDispatch, useSelector } from 'react-redux';
import { setfiltermovies, setgenres, setlanguages, setmovie, setmovies, setselectedGenres, setselectedLanguages, setshowGenresFilter, setshowLanguageFilter, viewfiltermovies, viewgenres, viewlanguages, viewmovies, viewselectedGenres, viewselectedLanguages, viewshowGenresFilter, viewshowLanguageFilter } from '../redux/HomepageSlice';
import { viewselectedCity } from '../redux/NavbarSlice';

const Homecontent = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showLanguageFilter = useSelector(viewshowLanguageFilter);
    const showGenresFilter = useSelector(viewshowGenresFilter);
    const languages = useSelector(viewlanguages);
    const genres = useSelector(viewgenres);
    const selectedGenres = useSelector(viewselectedGenres);
    const selectedLanguages = useSelector(viewselectedLanguages);
    const movies = useSelector(viewmovies);
    const filtermovies = useSelector(viewfiltermovies);
    const selectedCity = useSelector(viewselectedCity);
    let tempMovies = [];

    useEffect(()=>{
         try {
                axios.get(`${BASE_URL}/language/getalllanguage`).then(response=>{
                   dispatch(setlanguages(response.data));
                }).catch(err=>console.log(err))
              } catch (error) {
                  alert(error.response.data.message);
              }
          try {
                 axios.get(`${BASE_URL}/genre/getallgenres`).then(response=>{
                     dispatch(setgenres(response.data));
                  }).catch(err=>console.log(err))
               } catch (error) {
                    alert(error.response.data.message);
               }
            try {
                const today = new Date(); 
                axios.get(`${BASE_URL}/movie/getallmovie/${selectedCity}/${new Date(today)}`).then(response=>{
                    dispatch(setmovies(response.data));
                    dispatch(setfiltermovies(response.data));
                   
                 }).catch(err=>console.log(err))
              } catch (error) {
                   alert(error.response.data.message);
              }
    },[]);
    
    useEffect(()=>{
        if(selectedGenres.length>0 && selectedLanguages.length>0){
            tempMovies = filtermovies.filter(obj => 
                selectedGenres.some(value => obj.genres.includes(value)) && selectedLanguages.some(value => obj.languages.includes(value))
              )
              dispatch(setmovies(tempMovies));
        }else if(selectedGenres.length>0){
            tempMovies = filtermovies.filter(obj => 
                selectedGenres.some(value => obj.genres.includes(value))
              )
              dispatch(setmovies(tempMovies));
        }else if(selectedLanguages.length>0){
            tempMovies = filtermovies.filter(obj => 
                selectedLanguages.some(value => obj.languages.includes(value))
              )
              
              dispatch(setmovies(tempMovies));
        }else{
            dispatch(setmovies(filtermovies));
        }

    },[selectedGenres,selectedLanguages])

    const handleGenre= async(genre)=>{
        dispatch(setselectedGenres(genre));
     }

    const handleNavigate = (movie) =>{
        dispatch(setmovie(movie));
        navigate("/theaterlist");
    }

   



    const handleLanguage= async(language)=>{
        dispatch(setselectedLanguages(language));
    }
  return (
    <>
    <Navbar/>
    <Sliderad/>
    <div className='mx-auto'>
      <div className="grid grid-cols-6 gap-1 mt-2 w-4/5 mx-auto">
        <div className="col-span-2 flex flex-col space-y-4">
            <div className='bg-transparent text-3xl font-bold'>Filters</div>
            <div className="col-start-1 col-end-2 col-span-3 w-11/12 max-h-fit bg-white flex flex-wrap gap-4 py-2 px-2">
                
                <div className="w-full flex justify-between items-center">
                    <div className="flex gap-2 justify-between items-center"><button className='btn text-gray-400' onClick={() =>{ dispatch(setshowLanguageFilter(!showLanguageFilter))}}>
                {showLanguageFilter ? <FaAngleDown /> : <FaAngleUp />}
                </button><p>Languages</p></div>
                    <div className="caret-transparent cursor-pointer" onClick={()=>dispatch(setselectedLanguages([]))}>Clear</div>
                   
                </div>
                
                {showLanguageFilter && languages.map((item) => {
                    // Check if the item is in the selectedItems array
                    const isSelected = selectedLanguages.includes(item);

                    return (
                    <div
                        key={item}
                        className={`p-0 font-roboto border caret-transparent w-1/3 border-red-500 text-center  cursor-pointer  ${isSelected ? 'bg-tomato' : 'bg-white'} ${isSelected ? 'text-white' : 'text-red-500'}`} onClick={()=>handleLanguage(item)}
                    >
                        {item}
                    </div>
                    );
                })}
        
            
            
            </div>
            <div className="col-start-1 col-end-3 col-span-2 w-11/12 max-h-fit bg-white flex flex-wrap gap-4 py-2 px-2">
                <div className="w-full flex justify-between items-center">
                    <div className="flex gap-2 justify-between items-center"><button className='btn text-gray-400' onClick={() => dispatch(setshowGenresFilter(!showGenresFilter))}>
                {showGenresFilter ? <FaAngleDown /> : <FaAngleUp />}
                </button><p>Genres</p></div>
                    <div className="caret-transparent cursor-pointer" onClick={()=>dispatch(setselectedGenres([]))}>Clear</div>
                </div>
                
                {showGenresFilter && genres.map((item) => {
                    // Check if the item is in the selectedItems array
                    const isSelected = selectedGenres.includes(item);

                    return (
                    <div
                        key={item}
                        className={`p-0 font-roboto border caret-transparent w-1/3 border-red-500 text-center  cursor-pointer  ${isSelected ? 'bg-tomato' : 'bg-white'} ${isSelected ? 'text-white' : 'text-red-500'}`} onClick={()=>handleGenre(item)}
                    >
                        {item}
                    </div>
                    );
                })}
            </div>
        </div>
        <div className='col-span-2 col-start-3 col-end-7'>
    <div className='bg-transparent text-3xl font-bold pb-4'>Movies in {selectedCity}</div>
     <div className="flex flex-wrap   justify-start gap-4 w-full mx-auto  pb-10 ">
     
     {movies.map((item,index)=>{
        
        return(
            <div key={item._id} className="w-64 max-h-fit cursor-pointer" onClick={()=>handleNavigate(item)}>
                    <img src={`${UPLOADS_URL}${item.posterimg}`} className="w-64 h-80 rounded-3xl"/>
                    
                    <div className="flex-col justify-between items-center space-y-4  rounded-md py-4 px-6">
                    <div className="text-left text-3xl">
                        {item.title}
                    </div>
                    <div className="flex justify-between items-center">
                        <p>{item.runtime} Mins</p>
                    </div>
                    
                    <div className="flex justify-between">
                        <p>{item.languages.join(',')}</p>
                    </div>
                </div>
            </div>
        )
        
        
     })}
    </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default Homecontent
