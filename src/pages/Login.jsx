import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { frontend_assets } from '../assets/frontend_assets/assets'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux';
import { setTheaterId } from '../redux/theaterSlice';
import { setIsLoggedIn, setLoginuser, setRole, viewRole } from '../redux/loginuserSlice';
import { BASE_URL } from '../services/config';

const validationSchema = Yup.object({
  email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
  
  
});

const Login = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) =>{
    navigate(path);
  }
  const dispatch = useDispatch();
  const role = useSelector(viewRole);

return (
  <div className="max-w-2xl mx-auto m-12 bg-white p-8  shadow-lg ">
    <div> <img src={frontend_assets.register_logo_img} className="lg:max-w-[85%] w-2/5 h-2/5 object-contain block mx-auto" alt="login-image" /></div>
    <div className="mb-4">
              <h3 className="text-3xl font-bold text-[#5c7eeb]">Login</h3>
            </div>
    <Formik
      initialValues={{
        email: '',
        password: '',
        
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        try {
           axios.post(`${BASE_URL}/user/login`,values).then(res=>
             {
              const userRole = res.data.role;
              dispatch(setRole(userRole));
              dispatch(setIsLoggedIn(true));
              dispatch(setLoginuser(res.data.login_user))
              localStorage.setItem('isLoggedIn', true);
              localStorage.setItem('role', userRole);
              localStorage.setItem('user', JSON.stringify(res.data.login_user));
              if(userRole == "super_admin"){
                navigate('/viewAdminHome');
              }else if(userRole == "theater_admin"){
                dispatch(setTheaterId(res.data.theater_id))
                localStorage.setItem('theaterid', res.data.theater_id);
                navigate('/screen/viewTheaterHome');
              }else{
                navigate('/');
              }
                resetForm();
             }
           ).catch(err=>{
             toast.error(err.response.data.message)
 
           })
         } catch (error) {
           console.error("Error submitting form:", error);
         }
       }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-cyan-900 font-semibold">Email</label>
            <Field
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full  text-xl  border-b border-gray-300 focus:border-[#5c7eeb] px-2 py-3 outline-none"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full  text-xl  border-b border-gray-300 focus:border-[#5c7eeb] px-2 py-3 outline-none"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          
          <div>
            <button
              type="submit"
              
              className="w-2/5 mx-44 py-3  bg-gradient-to-b from-[#5c7eeb] to-[#24dedc] text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
               Login
            </button>
          </div>
          
        </Form>
      )}
    </Formik>
    

            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm mt-8">Dont have an account? <a href="javascript:void(0);" onClick={()=>{handleNavigation('/user/register')}} className="text-[#5c7eeb] 18307c hover:text-[#18307c] font-semibold hover:underline ml-1">Sign up</a></p>
                
            </div>
  </div>

)
};

export default Login;
