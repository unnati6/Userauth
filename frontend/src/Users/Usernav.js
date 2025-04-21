import React from 'react'
import './Nav.css';
import { Link } from 'react-router-dom'
import { Authcontext } from '../context/Authcontext';
import { useContext } from 'react';

function Usernav() {
   const { user } = useContext(Authcontext);
  return (
    <>
    
     <nav className="user-navbar">
     <div className="main-nav">
         <ul className="nav-ul-1">
           <li className="nav-item">
             <h1>{user?.fname && user?.lname ? `${user.fname} ${user.lname}` : 'User'}</h1>
             <Link className="nav-link" aria-current="page" to="/user/profilesetup">Edit</Link>
           </li>
           
         </ul>
         
       </div>
     
   </nav>
</>
  )
}

export default Usernav
