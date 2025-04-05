import React, { useContext } from 'react';
import Usernav from './Usernav';
import { Authcontext } from '../context/Authcontext';
import { Link } from 'react-router-dom';
import Managelink from '../Links/Managelink';
function Userdash() {
  const { user } = useContext(Authcontext);

  return (
    <>
    
      <Usernav />
      <div className='user-content'>
        {user ? (
          <>
            <h2 className='user-content-1'>Welcome {user?.username||"User"}!</h2>
            <Link to="/link">
        <button className='createlink-button'> Create new Links</button>
      </Link>
      <Managelink />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      
    </>
  );
}

export default Userdash;
