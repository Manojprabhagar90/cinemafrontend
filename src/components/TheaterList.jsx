import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { viewmovie } from '../redux/HomepageSlice';
import axios from 'axios';
import { setScreen, setScreenId, setShow, setShowId, setTheater, setTheaterList, viewScreen, viewShow, viewTheater, viewTheaterList } from '../redux/theaterSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../services/config';
const TheaterList = () => {

    const [nextDays,setnextDays] = useState([]);
    const [selectedDate,setSelectedDate] = useState();
    const movie = useSelector(viewmovie);
    const theaterlist = useSelector(viewTheaterList);
    const theaterobj = useSelector(viewTheater);
    const screenobj = useSelector(viewScreen);
    const showobj = useSelector(viewShow);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleScreenNavigate = (screenid,showid,theatre,screen,show) =>{
        dispatch(setScreenId(screenid));
        dispatch(setShowId(showid));
        dispatch(setTheater(theatre));
        dispatch(setScreen(screen));
        dispatch(setShow(show));
        navigate("/selectseat");
    }

    const handleDateChange = (date) =>{
        setSelectedDate(date);
    }

    useEffect(()=>{
        const today = new Date(); 
        let next7Days = [];
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

        const dayOfWeek = daysOfWeek[today.getDay()];  
        const dayOfMonth = String(today.getDate()).padStart(2,'0');  
        const month = months[today.getMonth()]; 
        setSelectedDate(today);
        try {
            axios.get(`${BASE_URL}/theater/${movie._id}/${new Date(today)}`).then(response=>{
             dispatch(setTheaterList(response.data));
            }).catch(err=>console.log(err))
          } catch (error) {
              alert(error.response.data.message);
          }
        next7Days.push({ dayOfWeek, dayOfMonth, month,nextDate:today });
        for (let i = 1; i <= 6; i++) {
        const nextDate = new Date(today);  
        nextDate.setDate(today.getDate() + i);
        nextDate.setHours("00");  
        nextDate.setMinutes("00") 
    
        
        const dayOfWeek = daysOfWeek[nextDate.getDay()];  
        const dayOfMonth = String(nextDate.getDate()).padStart(2,'0');  ;  
        const month = months[nextDate.getMonth()];  
    
        
        next7Days.push({ dayOfWeek, dayOfMonth, month,nextDate });
        }
        
        setnextDays(next7Days)
    },[]);

    useEffect(()=>{
        
        try {
               axios.get(`${BASE_URL}/theater/${movie._id}/${new Date(selectedDate)}`).then(response=>{
                dispatch(setTheaterList(response.data));
               }).catch(err=>console.log(err))
             } catch (error) {
                 alert(error.response.data.message);
             }
         
   },[selectedDate]);
  
    
    //setnextDays(next7Days)
    

  return (
    <div>
    <Navbar/>
      <div className="bg-white text-black border-y-2 border-solid border-gray-400  p-4">
        <div className='text-4xl text-gray-800 font-bold w-4/5 mx-auto  max-h-40'>{movie.title}</div>
        <div className='flex w-4/5 mx-auto justify-start gap-2'>
        {movie.genres?.map((genre)=>{
            return (
                <div className="p-0 mt-4 font-roboto border caret-transparent rounded-2xl w-16 border-gray-400 text-center  cursor-pointer  bg-white text-gray-400">
                        {genre}
                    </div>
            )
        })}
        
        </div>
      </div>
      
      <div className='flex gap-2 py-1 px-44 border-b-2 border-solid border-gray-400 bg-white sticky top-0'>
      {
            nextDays.map((item,index)=>{
               const isSelected = (selectedDate == item.nextDate)
             return(   
                <div className={` flex flex-col rounded-xl items-center justify-start ${isSelected ? 'bg-tomato' : 'bg-white'} ${isSelected ? 'text-white' : 'text-gray-500'} gap-0 py-1 px-4 cursor-pointer`} onClick={()=>handleDateChange(item.nextDate)}>
                    <p>{item.dayOfWeek}</p>
                    <p className={`${isSelected ? 'text-white' : 'text-gray-900'} font-bold`}>{item.dayOfMonth}</p>
                    <p>{item.month}</p>
                </div>
             )
            })}
        
        
      </div>
      <div className='bg-white w-4/5 mx-auto mt-6'>
        
        {
            theaterlist.map((theater)=>{
                return (
                    <div className='flex justify-start gap-10 items-start p-4'>
                    <div className='max-h-fit'>{theater.name.toUpperCase()}</div>
                    <div className='flex justify-start items-start ml-24'>
                    {theater.screens.map((screen)=>{
                        return(
                            <div className='flex justify-start gap-4 items-center pr-4'>
                        {screen.showtimes.map((times)=>{
                           
                            return(
                                <div className="py-1 font-roboto border caret-transparent w-28 border-green-500 text-center text-sm cursor-pointer  bg-white text-gray-400" onClick={()=>handleScreenNavigate(screen.screen_id,times.showId,theater,screen,times)}>
                                    {new Date(new Date(times.showdatetime).toISOString()).toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                        timeZone: 'UTC'  
                                        })}
                                    <p className='text-xs'>{screen.screen_name}</p>
                                </div>
                            )
                        
                        })}
                        </div>
                    )
                    })}
                    </div>
                    </div>
            
                )
            })
        }
        
      </div>
    </div>
  )
}

export default TheaterList
