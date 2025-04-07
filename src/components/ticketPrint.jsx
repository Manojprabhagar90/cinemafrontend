import React,{ useRef } from 'react'
import { useSelector } from 'react-redux'
import { viewBooking } from '../redux/HomepageSlice'
import Navbar from './Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../services/config';

const TicketPrint = () => {

    const booking = useSelector(viewBooking);
    const printRef = useRef();
    const navigate = useNavigate();
    const inputDate = new Date(booking.showdatetime)
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
      const ticketseat = booking.bookedSeats.map((seat)=>{
        return seat.row+seat.label
        }).join(",");

        const handlePrint = () => {
        const content = printRef.current;  
    
        const printWindow = window.open('', '', 'height=500,width=500');  
        printWindow.document.write('<html><head><title>Print</title><style>.content{text-align : center}</style></head><body>');
        printWindow.document.write(content.innerHTML); 
        printWindow.document.write('</body></html>');
        printWindow.document.close();  
    
        printWindow.print();  
      };

      const handleCancel = () =>{
        axios.put(`${BASE_URL}/bookings/${booking._id}`,{
            headers: {
              'Content-Type': 'application/json',
          }
        }).then(res=>{
          Swal.fire({
                        text: 'Ticket is cancelled successfully',
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Stay Here',
                      }).then((result) => {
                        if (result.isConfirmed) {
                          
                          navigate('/user/bookings'); 
                        } else if (result.dismiss === Swal.DismissReason.cancel) {
                          console.log('User chose to stay on the page');
                        }
                      });
        }).catch(err=>console.log(err))
        
      }
    
  return (
    <><Navbar/>
    <div className="max-w-2xl mx-auto bg-white py-4 mt-10 shadow-lg ">
    <div ref={printRef} >
    <div className='content bg-white w-4/5 mx-auto mt-6 text-center space-y-2'>
    <p className='text-2xl font-bold'>{booking.moviename}</p>
    <p>Theater Name : {booking.theater_name}</p>
    <p>Screen Name : {booking.screen_name}</p>
    <p>Timing : {ticketdate}  {tickettime}</p>
    <p>Seats : {ticketseat}</p>

    </div>
    </div>
    <button className='bg-tomato mt-12 p-2 mx-72 w-24' onClick={handlePrint}>Print Ticket</button><button className="bg-tomato mt-11 p-2 mx-64 w-36" onClick={()=>handleCancel()}>Cancel ticket
    </button>
    </div>
    </>
  )
}

export default TicketPrint
