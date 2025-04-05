import React from 'react'
import './Nav.css';
import { Link } from 'react-router-dom'
function Usernav() {
  return (
    <>
    
     <nav className="user-navbar">
     <div className="main-nav">
       <a className="main-nav-head" href="#">UserLog</a>
      
       <div className="nav-1">
         <ul className="nav-ul-1">
           <li className="nav-item">
             
             <Link className="nav-link" aria-current="page" to="/user/profilesetup">Profile</Link>
           </li>
           <li className="nav-item">
             <Link className="nav-link" aria-current="page" to="/link">Links</Link>
           </li>
           
         </ul>
         
       </div>
     </div>
   </nav>
</>
  )
}

export default Usernav
