import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { frontend_assets } from '../assets/frontend_assets/assets'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast"
import { BASE_URL } from '../services/config';

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters long')
    .required('Username is required'),
  
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
  
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const Register = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) =>{
    navigate(path);
}


return (
  <div className="max-w-2xl mx-auto bg-white p-8  shadow-lg ">
    <div> <img src={frontend_assets.register_logo_img} className="lg:max-w-[85%] w-2/5 h-2/5 object-contain block mx-auto" alt="login-image" /></div>
    
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role : 'User'
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
       try {
          axios.post(`${BASE_URL}/user/add`,values).then(res=>
            {
              setTimeout(() => {
                navigate('/user/login');  
              }, 2000);
              resetForm({ values: {
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
              } });
              toast.success(`User added successfully`)
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
            <label htmlFor="username" className="block text-cyan-900 font-semibold">Username</label>
            <Field
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className="w-full  text-xl  border-b border-gray-300 focus:border-[#5c7eeb] px-2 py-3 outline-none"
            />
            <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
            <Field
              type="email"
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

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold">Confirm Password</label>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full  text-xl  border-b border-gray-300 focus:border-[#5c7eeb] px-2 py-3 outline-none"
            />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
          </div>
         
          <div>
            <button
              type="submit"
              
              className="w-2/5 mx-44 py-3  bg-gradient-to-b from-[#5c7eeb] to-[#24dedc] text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Register
            </button>
          </div>
          
        </Form>
      )}
    </Formik>
    

            <div className="mt-4">
              
             
             <p className="text-sm  mt-8">Already have an account? <a href="javascript:void(0);" onClick={()=>{handleNavigation('/user/login')}} className="text-[#5c7eeb] hover:text-[#18307c]  font-semibold hover:underline ml-1">Login here</a></p>
            </div>
            
  </div>

)
};

export default Register;
