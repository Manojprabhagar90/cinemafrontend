import React,{ useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { viewLoginuser } from '../redux/loginuserSlice';
import axios from 'axios';
import Navbar from './Navbar';
import { setBooking, setBookings, viewBookings } from '../redux/HomepageSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../services/config';

const UserBookings = () => {

  const loginuser = localStorage.getItem('user')//useSelector(viewLoginuser);
  console.log(JSON.parse(loginuser)._id);
  const bookingslist = useSelector(viewBookings)
  const userId = JSON.parse(loginuser)._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlenavigate = (bookings) =>{
    dispatch(setBooking(bookings));
    navigate('/user/ticket')
  }

  useEffect(() => {
     axios.get(`${BASE_URL}/bookings/tickets/${userId}`).then(response=>{
        const bookedData = response.data;
        dispatch(setBookings(bookedData));
        
      }).catch(err=>console.log(err));
    }, [])
  return (
    <>
    <Navbar/>
    <div className="max-w-2xl mx-auto bg-white py-4 mt-10 shadow-lg ">
    <div className='bg-white w-4/5 mx-auto mt-6'>
        
        {
            bookingslist.map((bookings)=>{
              const inputDate = new Date(bookings.showdatetime)
                    const tickettime = new Date(inputDate.toISOString()).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                      timeZone: 'UTC'  
                      })
                      const year = inputDate.getFullYear();
                      
                      const month = String(inputDate.getMonth() + 1).padStart(2, '0');
                      const day = String(inputDate.getUTCDate()).padStart(2, '0'); 

                      const ticketdate = `${day}/${month}/${year}`;
                      const ticketseat = bookings.bookedSeats.map((seat)=>{
                        return seat.row+seat.label
                       }).join(",");
                return (
                    <div className='flex justify-start gap-10 items-start border-b-2 py-3 px-1 cursor-pointer' onClick={()=>handlenavigate(bookings)}>
                    <div className='flex flex-col'>
                           <p className='font-bold text-3xl'>{bookings.moviename}</p>
                           <p>{bookings.theater_name},{bookings.screen_name}</p>
                           <p>{ticketdate} - {tickettime}</p>
                           
                           <p>Seats : {ticketseat}</p>
                    </div>
                    
                    </div>
            
                )
            })
        }
        
      </div>
    </div></>
    
  )
}

export default UserBookings
