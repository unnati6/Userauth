import React, { useContext, useState } from 'react';
import {  addLink } from '../Api';
import Usernav from '../Users/Usernav';
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../context/Authcontext';
const LinkManager = () => {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ title: '', url: '' });
  const navigate = useNavigate();
  const {user}=useContext(Authcontext);
  const handleAddLink = async () => {
    try {
      const res = await addLink(newLink);
      setLinks([...links, res.data.link]);
      setNewLink({ title: '', url: '' });
      alert("Link added!");
      navigate(`/user/${user.username}/${user._id}`)
    } catch (error) {
      alert("Failed to add link");
    }
  };

  
  return (
    <>
    <Usernav />
    <div className="main-container-createlink">
      <h1>Create Your Links</h1>
       <div>
        <input type="text" placeholder="Title" value={newLink.title} onChange={(e) => setNewLink({ ...newLink, title: e.target.value })} />
        <input type="text" placeholder="URL" value={newLink.url} onChange={(e) => setNewLink({ ...newLink, url: e.target.value })} />
        <button onClick={handleAddLink}>Add</button>
      </div>

  
      
    </div>

    </>
      );
};

export default LinkManager;
