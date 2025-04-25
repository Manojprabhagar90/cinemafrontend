import { useEffect, useRef, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { MapInteractionCSS } from 'react-map-interaction';
import axios from 'axios';
import { FaAngleLeft  } from "react-icons/fa6";
import toast from "react-hot-toast"
import Swal from 'sweetalert2';
import "../styles/creator.css"

// hooks
import useWindowDimensions from '../hooks/useWindowDimensions';

// components
import Row from './Row';
import Stage from './Stage';
import Legend from './Legend';
import SelectSeat from './SelectSeat';
import useCreatorPage from '../pages/useCreatorPage';
import { useDispatch, useSelector } from 'react-redux';
import { viewmovie, viewshow } from '../redux/HomepageSlice';
import { setPayprice, viewPayprice, viewScreen, viewScreenId, viewShow, viewShowId, viewTheater } from '../redux/theaterSlice';
import { useNavigate } from 'react-router-dom';
import { viewLoginuser } from '../redux/loginuserSlice';
import { BASE_URL } from '../services/config';


// variables
const defaultValues = {
  scale: 1,
  translation: { x: 20, y: 20 },
};

const UserSeatView = () => {
  const { width, height } = useWindowDimensions();
  const dispatch = useDispatch();
  const [props, setProps] = useState(defaultValues);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatData, setSeatData] = useState(new Map())
  const [seatMap, setSeatMap] = useState(null)
  const [loading, setLoading] = useState(true)
  const moviename = useSelector(viewmovie);
  const theatreobj = useSelector(viewTheater);
  const screenobj = useSelector(viewScreen);
  const showobj = useSelector(viewShow);
  const userobj = JSON.parse(localStorage.getItem('user'))//useSelector(viewLoginuser);
  const screenid = useSelector(viewScreenId);
    const showid = useSelector(viewShowId);
    const payprice = useSelector(viewPayprice);
    const paypal = useRef();
    const navigate = useNavigate();
  let showdata =[];
  let commonentries = [];
  let temptotal = 0;
  const [commonObjects,setcommonObjects] = useState([]);
  const groupByRow = seats => {
    
    return seats.reduce((acc, seat) => {
      const currentRow = acc.get(seat.row) || []

      acc.set(seat.row, [...currentRow, seat])

      return acc
    }, new Map())
  }

  useEffect(() => {
    if (paypal.current) {
      paypal.current.innerHTML = '';  
    }
    window.paypal
      .Buttons({
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'checkout',
          size: 'small'
        },
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Ticket booking",
                amount: {
                  currency_code: "USD",
                  value: payprice,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          
          const formData = new FormData();
          formData.append('selected',JSON.stringify(selectedSeats));
          formData.append('showID',showid);
          formData.append('orderId',order.id);
          formData.append('theater',JSON.stringify(theatreobj));
          formData.append('screen',JSON.stringify(screenobj));
          formData.append('user',JSON.stringify(userobj));
          formData.append('show',JSON.stringify(showobj));
          formData.append('movie',JSON.stringify(moviename));
          axios.post(`${BASE_URL}/bookings/add`,formData,{
              headers: {
                'Content-Type': 'application/json',
            }
          }).then(res=>{
            
            Swal.fire({
              text: 'Ticket is booked successfully softcopy sent to your registered email',
              icon: 'success',
              showCancelButton: false,
              confirmButtonText: 'OK',
              cancelButtonText: 'Stay Here',
            }).then((result) => {
              if (result.isConfirmed) {
                
                navigate('/'); 
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                console.log('User chose to stay on the page');
              }
            });
          }).catch(err=>console.log(err))
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, [payprice]);

  useEffect(() => {
    let data = {};


    axios.get(`${BASE_URL}/screens/${screenid}`).then(response=>{
      data = response.data;
      const { seatMapData, ...restData } = data
      setSeatMap(restData)
      axios.get(`${BASE_URL}/bookings/${showid}`).then(response=>{
        showdata = response.data;
        commonentries = showdata.filter(obj1 =>
          seatMapData.some(obj2 => obj2.row === obj1.row && obj2.label === obj1.label)
        ) 
        setcommonObjects(commonentries);
        setSeatData(groupByRow(seatMapData))
        setLoading(false)
      }).catch(err=>console.log(err));
    }).catch(err=>console.log(err))
  }, [])


  const handleNavigate = (path) =>{
         navigate(path);
      }
      const checkLogin = (e) => {
       let islog = JSON.parse(localStorage.getItem('isLoggedIn'));
        if(islog){

        }else{
          Swal.fire({
            text: 'Please login to proceed with bookings.',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Login',
            cancelButtonText: 'Stay Here',
          }).then((result) => {
            if (result.isConfirmed) {
              
              navigate('/user/login');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              console.log('User chose to stay on the page');
            }
          });
         e.stopPropagation();
        }
      };
 
  const handleSelect = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s.id !== seat.id) : [...prev, seat]
    );
  };

  useEffect(()=>{
    
      if(selectedSeats.length>0){
        temptotal = selectedSeats.reduce((total,item) => {return total + parseInt(item.price)},0);
        dispatch(setPayprice(temptotal))
      }else{
        dispatch(setPayprice(0))
      }
  },[selectedSeats])

 
  const rows = Array.from(seatData?.entries());

  return (
    <>
    <div className='w-full '>
    
    <div className='text-xl text-gray-800   h-16 flex items-center bg-white'><button className='btn font-bold text-gray-400' onClick={() =>{handleNavigate('/theaterlist')}}>
                   <FaAngleLeft /> 
                    </button>
                    <div className='flex flex-col'>
                      <p className='text-3xl font-bold'>{moviename.title}</p>
                      <p className='text-sm pt-1 px-1 font-bold text-gray-600'>{theatreobj.name},{screenobj.screen_name}</p>
                    </div></div>
    <div className='w-1/3 mt-10 mx-auto bg-white'><Legend /></div>
      <div className='w-3/5 mx-auto py-12 px-8' onClickCapture={checkLogin} onContextMenu={(e) => e.preventDefault()}>
        
           {rows?.map(([row, seatsInRow], index) => (
            <Row
              preview
              row={row}
              key={row}
              rowIndex={index}
              dragHandleProps={null}
              empty={row.startsWith('empty-')}
            >
              {seatsInRow.map((seat) => (
                <SelectSeat
                  seat={seat}
                  key={seat.id}
                  onSelect={() => handleSelect(seat)}
                  selected={selectedSeats.includes(seat)}
                  occupied={commonObjects.some(common =>common.row == seat.row && common.label == seat.label)}
                />
              ))}
            </Row>
          ))}
        
      </div>
          <Stage/>
      

      <Tooltip id='description' />
      {payprice>0 && <div className='fixed bottom-0 w-full bg-red-300 text-center p-6'>    
        <div className='w-44  px-6 py-2 mx-auto font-bold text-xl'>
          Pay {payprice}</div><div className='w-44 mx-auto' ref={paypal}></div>
      </div>}

      </div>
    </>
  );
};

export default UserSeatView;
