import React from 'react'
import {Link , useNavigate } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { registerUser } from '../Api';
function Signup() {
   // const [issubmit, setIssubmit] =useState(false);
   const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        email:Yup.string().email().required("Email is required"),
        password:Yup.string().required("Password is required").min(8,'Password must be atleast 8 characters').max(10,'Password must be atmost 10 characters')
        
    })
    const formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validationSchema,
        onSubmit: async(values)=>{

             await registerUser(values)
             .then(response=>{
                console.log(response);
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate("/login")
                },2000);
                
             })
            
             .catch(error=>{
                console.error("Signup error:", error);
                if (error.response) {
                    const errorMessage = error.response.data.message || "Signup failed";
                    if (error.response.status === 409 && errorMessage === "User already exists") {
                        toast.error(error.response.data.message);
                        setTimeout(() => {
                            navigate("/login")
                        },2000);
                        
                    } else {
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
    <div className='main-container'>
        <h1>Signup</h1>
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor='email'>Email</label>
                <input 
                    type="email"
                    name="email"
                    placeholder='Enter Email'
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

            <div>
                <label htmlFor='password'>Password</label>
                <input 
                    type="password"
                    name="password"
                    placeholder='Enter password'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    
                />   
                 <div className="invalid-feedback">
                {formik.errors.password && formik.touched.password
                  ? formik.errors.password
                  : null}
              </div>
            </div>

            <button type='submit' >Signup</button>
            <span className="reg-span">Already have account ? 
                <Link className="reg-link" to="/login"> Login</Link>
            </span>
        </form>
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

export default Signup
