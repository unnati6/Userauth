import React, { useContext,useState } from 'react';
import Usernav from './Usernav';
import card from '../assets/Card (1).svg';
import { Authcontext } from '../context/Authcontext';
import { Link } from 'react-router-dom';
import Managelink from '../Links/Managelink';
import {useNavigate} from 'react-router-dom'
import { FiExternalLink } from "react-icons/fi";
import { addbio} from '../Api';

function Userdash() {
  const { user } = useContext(Authcontext)
  const [links, setLinks] = useState([]);;
  const [animatePush, setAnimatePush] = useState(false);
  const navigate = useNavigate();
  const [bio,setBio]=useState({
    title:"",
    description:""
  })
  const handleaddBio = async()=>{
    try {
      const res = await addbio(bio);
      setLinks([...links, res.data.bio]);
      setBio({ title: '', description: '' });
     alert("Bio add");
    } catch (error) {
    }
  
  }
  return (
    <>
    
  
      <div className="dashboard-wrapper">
      <Usernav />
      {user ? (
        <div className="dashboard-container">
          <div className="main-div">
           {/* Profile Section */}
           <div className="profile-section">
            <img
             src={user.picture ? `http://localhost:5000/uploads/${user.picture}` : '/default-avatar.png'}
             alt=""
              className="profile-image"
            />
            <h2 className="username">{user?.fname && user?.lname ? `${user.fname} ${user.lname}` : 'User'}</h2>
          </div>

          {/* Note Section */}
          <div className="note-box">
  <div className="note-header">
    <img src={card} alt="icon" className="note-icon" />
    <div className="note-texts">
      <input placeholder="Write a Title" className="title-input" 
      type="text"
      value={bio.title}
      onChange={(e) => setBio({ ...bio, title: e.target.value })}
 
      />
      <textarea placeholder="Description Here" 
      className="desc-input" 
      name="description"
      value={bio.description}
      onChange={(e) => setBio({ ...bio, description: e.target.value })}
 
      />
    </div>
  </div>
  <button className="save-btn" onClick={handleaddBio}>Save</button>
</div>
<Managelink />  
<div className="add-link">
  <Link to="/link" className={`add-link-btn ${animatePush ? 'push-right' : ''}`}
    onClick={(e) => {
      e.preventDefault();
      setAnimatePush(true);
      setTimeout(() => {
        setAnimatePush(false);
        navigate('/link')
      }, 300);
    }}>
    Add New Link
  </Link>
</div>
          </div>
          <Link
  to="/preview"

  className="preview-profile-link"
>
  <button className="preview-profile-btn">
    
    Preview Profile <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
<path d="M18.5 13V19C18.5 19.5304 18.2893 20.0391 17.9142 20.4142C17.5391 20.7893 17.0304 21 16.5 21H5.5C4.96957 21 4.46086 20.7893 4.08579 20.4142C3.71071 20.0391 3.5 19.5304 3.5 19V8C3.5 7.46957 3.71071 6.96086 4.08579 6.58579C4.46086 6.21071 4.96957 6 5.5 6H11.5" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.5 3H21.5V9" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 14L21.5 3" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  </button>
</Link>
          {/* Link Button */}


        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </>
  );
}

export default Userdash;
