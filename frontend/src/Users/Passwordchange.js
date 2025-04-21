import React from 'react'
import {Link} from 'react-router-dom'
function Passwordchange() {
  return (
    <>
 
    <div className="Forget-password-container">
      <div className="Form-container">
        <div className="Text-container">
            <h2 className="Title">
            Forgot Password?
            </h2>
            <h2 className="Description">
            Lost your password? No worries! Pop in your email, and we'll zap you a reset link!
            </h2>
        </div>
        <div className="input-data">
            <input
            name="email"
            placeholder="Eg. adam@example.com"
            text="email"
            />
            <button className="resendlink">
            Send Reset Link
            </button>
            <button className="back-login">
           <a href='/login'>  ← Back to Login</a>
            </button>
        </div>
      </div>
      <div className="Footer">
        <span>Legal</span>
        <span>•</span>
        <span>Self Hosted</span>
        <span>•</span>
        <span>Sign Up</span>
        <span>•</span>
        <span>Need Help?</span>
       
        
      </div>
      </div>  
    </>
  )
}

export default Passwordchange
