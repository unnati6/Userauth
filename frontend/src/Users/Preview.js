
import React, { useEffect, useState,useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getbio } from '../Api';
import { getUserProfile , getLinks } from '../Api';
import { Authcontext } from '../context/Authcontext';
function Preview() {
const {user}=useContext(Authcontext);
const [title, setTitle] = useState('');
const [desc, setDesc] = useState('');
const [links, setLinks] = useState([]);
useEffect(() => {
    const fetchData = async () => {
      await fetchBios();
      await fetchLinks();
    };
  
    fetchData();
  }, []);
  

  const fetchBios = async () => {
    try {
      const res = await getbio();
      const bio = res.data.bios[0]; 
      if (bio) {
        setTitle(bio.title);
        setDesc(bio.description);
      }      
    } catch (error) {
      alert("Failed to fetch bio");
    }
  };
  
  const fetchLinks = async () => {
    try {
      const res = await getLinks();
      setLinks(res.data.links);
      console.log(res.data.links)
    } catch (error) {
      alert("Failed to fetch links");
    }
  };
  return (
    <>
    <div className="preview-container">
      {user ? (
        <>
          <img
            src={`http://localhost:5000/uploads/${user.picture}`}
            alt={user.fname}
            className="preview-profile-img"
          />
          <h2 className="preview-username">{user.fname} {user.lname}</h2>
          <div className="preview-bio">
            <p className="preview-title">{title || "Hi, I'm..."}</p>
            <p className="preview-description">{desc || ""}</p>
          </div>

          
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="preview-link-btn"
              >
                {link.title ||"link"}
              </a>
            ))}
          
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
    </>
  )
}

export default Preview;
