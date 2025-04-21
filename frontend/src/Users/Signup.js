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
        password:Yup.string().required("Password is required").min(6,'Must be atleast 6 characters long').max(10,'Password must be atmost 10 characters'),
        confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref('password'), null], "Passwords must match")
    })
    const formik = useFormik({
        initialValues:{
            email:"",
            password:"",
            confirmPassword:""
        },
        validationSchema,
        onSubmit: async(values)=>{
            const { confirmPassword, ...dataToSubmit } = values;
             await registerUser(dataToSubmit)
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
        <div className='head-container'>
            <h1 className='title'>Create an account</h1>
            <h1 className='subtitle'>Get started with MynaUI today</h1>
        </div>
        <form onSubmit={formik.handleSubmit} className='form-container'>
            <div className='div1'>
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

            <div className='div2'>
                <label htmlFor='password'>New Password</label>
                <input 
                    type="password"
                    name="password"
                    placeholder='••••••••••'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    
                />  
                <p>Must be at least 6 characters long.</p> 
                 <div className="invalid-feedback">
                {formik.errors.password && formik.touched.password
                  ? formik.errors.password
                  : null}
              </div>
            </div>

            <div className='div3'>
  <label htmlFor='confirmPassword'>Confirm Password</label>
  <input 
    type="password"
    name="confirmPassword"
    placeholder='••••••••••'
    onChange={formik.handleChange}
    value={formik.values.confirmPassword}
  />
  {/* <div className="invalid-feedback">
    {formik.errors.confirmPassword && formik.touched.confirmPassword
      ? formik.errors.confirmPassword
      : null}
  </div> */}
</div>

            <button type='submit'className='submit-data' >Create Account →</button>
            
        </form>
        <span className="reg-span">Already have account ? 
                <Link className="reg-link" to="/login"> Login</Link>
            </span>
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
