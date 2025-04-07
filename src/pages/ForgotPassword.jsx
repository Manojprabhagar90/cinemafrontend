import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { frontend_assets } from '../assets/frontend_assets/assets'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  
  
});

const Login = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) =>{
    navigate(path);
}
return (
  <div className="max-w-2xl mx-auto m-12 bg-white p-8  shadow-lg ">
    <div> <img src={frontend_assets.register_logo_img} className="lg:max-w-[85%] w-2/5 h-2/5 object-contain block mx-auto" alt="login-image" /></div>
    <div className="mb-4">
              <h3 className="text-3xl font-bold text-[#5c7eeb]">Login</h3>
            </div>
    <Formik
      initialValues={{
        email: '',
        
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // Handle form submission here
        console.log('Form data', values);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
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

          
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-2/5 mx-44 py-3  bg-gradient-to-b from-[#5c7eeb] to-[#24dedc] text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Send code
            </button>
          </div>
          
        </Form>
      )}
    </Formik>
    

            <div className="mt-4 flex justify-between items-center">
               <p className="text-sm mt-8">Remember the password? <a href="javascript:void(0);" onClick={()=>{handleNavigation('/user/login')}}  className="text-[#5c7eeb] hover:text-[#18307c] font-semibold hover:underline ml-1">Login here</a></p>
            </div>
  </div>

)
};

export default Login;
