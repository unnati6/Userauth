import React, { useContext } from 'react'
import {Link , useNavigate } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import { useFormik } from "formik";
import { loginUser } from '../Api';
import { Authcontext } from '../context/Authcontext';

import * as Yup from 'yup';
function Login() {
   // const [issubmit, setIssubmit] =useState(false);
   const {setUser} = useContext(Authcontext)
   const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        email:Yup.string().email().required("Email is required"),
        password:Yup.string().required("Password is required").min(6,'Password must be atleast 6 characters').max(10,'Password must be atmost 10 characters')
        
    })
    const formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validationSchema,
        onSubmit: async(values,{resetForm})=>{

             await loginUser(values)
             .then(response=>{
                console.log(response);
                toast.success(response.data.message);
                localStorage.setItem('token',response.data.jwttoken)
                setUser(response.data.user)
                setTimeout(() => {
                    navigate(`/user/${response.data.user.fname}/${response.data.user._id}`);

                },2000);
                
             })
            
             .catch(error=>{
                console.error("Login error:", error);
                if (error.response) {
                    const errorMessage = error.response.data.message || "Login failed";
                    if (error.response.status === 403 && errorMessage === "Email and Password is Wrong") {
                        toast.error(error.response.data.message);
                        setTimeout(() => {
                            navigate("/signup")
                        },2000);
                        
                    }else if(error.response.status === 403 && errorMessage === "Password is Wrong") {
                      toast.error(error.response.data.message);
                      resetForm();
                    }
                     else {
                        toast.error(errorMessage);
                    }
                } else {
                    toast.error("Network error. Please try again.");
                }   
              })
              
            
        }
    })
  return (
    <>
    <div className='main-container-login'>
    <div className='head-container'>
            <h1 className='title'>Login</h1>
            <h1 className='subtitle'>Enter your details below to login</h1>
        </div>
        <form onSubmit={formik.handleSubmit} className='form-container-login'>
            <div className='div1'>
                <label htmlFor='email'>Email</label>
                <input 
                    type="email"
                    name="email"
                    placeholder='team@mynaui.com'
                    autoFocus
                    onChange={formik.handleChange}
                    value={formik.values.email}
                /> 
                <div className="invalid-feedback">
                {formik.errors.email && formik.touched.email
                    ? formik.errors.email
                    : null}   
                </div>
            
            </div>

            <div className='div2'>
                <label htmlFor='password'>Password</label>
                <input 
                    type="password"
                    name="password"
                    placeholder='••••••••••'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    
                />   
                 <div className="invalid-feedback">
                {formik.errors.password && formik.touched.password
                  ? formik.errors.password
                  : null}
              </div>
            </div>

            <button type='submit' className='submit-data'>Login</button>
            <button type='submit' className='submit-data2'>Login with Google</button>            
           
        </form>
        <div className='FORGETLINK'>
        <span className="reg-span1">Don't have an account?
                <Link className="reg-link" to="/signup">  Sign up</Link>
            </span>
            <span className="reg-span2">
            <Link className="reg-link" to="/forget">Forgot your password?</Link>
    
            </span>
              
        </div>
        
        <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"/>

    </div>
    </>
  )
}

export default Login;
