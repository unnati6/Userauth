import React, { useContext, useState } from 'react';
import {  addLink } from '../Api';
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../context/Authcontext';
const LinkManager = () => {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ title: '', url: '' });
  const navigate = useNavigate();
  const [animateSave, setAnimateSave] = useState(false);
  const {user}=useContext(Authcontext);
  const handleAddLink = async () => {
    setAnimateSave(true); 
    setTimeout(async () => {
      try {
        const res = await addLink(newLink);
        setLinks([...links, res.data.link]);
        setNewLink({ title: '', url: '' });
       
        navigate(`/user/${user.username}/${user._id}`);
      } catch (error) {
    
      } finally {
        setAnimateSave(false); 
      }
    }, 300);
  };

  
  return (
    <>
    
    <div className={`editable-label-group ${animateSave ? 'slide-out' : ''}`} >
  <input
    type="text"
    placeholder="Type Link Name"
    className="editable-label-input"
    autoFocus
    value={newLink.title}
    onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
  />

  <div className="url-input-wrapper">
    <input
      type="text"
      placeholder="Type URL here"
      className="editable-url-input"
      value={newLink.url}
      onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
    />
  
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
  <rect width="34" height="34" rx="6" fill="#155DFC"/>
  <path d="M26.317 8.75933C26.4691 8.86665 26.5985 9.00287 26.6978 9.1602C26.7972 9.31754 26.8646 9.49292 26.8962 9.67631C26.9277 9.8597 26.9229 10.0475 26.8818 10.229C26.8408 10.4105 26.7644 10.5822 26.657 10.7342L18.6302 22.0958C18.1202 22.8155 17.6881 23.4275 17.2985 23.8936C16.892 24.3752 16.4344 24.8257 15.828 25.1119C14.9297 25.539 13.9045 25.6163 12.9522 25.3287C12.3062 25.1346 11.7905 24.7535 11.3245 24.3342C10.8782 23.9304 10.3725 23.3878 9.7803 22.7532L7.46405 20.2697C7.33219 20.1347 7.22865 19.9747 7.15951 19.799C7.09037 19.6234 7.05702 19.4357 7.06142 19.247C7.06582 19.0583 7.10788 18.8724 7.18514 18.7002C7.26239 18.528 7.37328 18.373 7.51129 18.2442C7.64929 18.1155 7.81164 18.0156 7.98879 17.9504C8.16594 17.8853 8.35432 17.8562 8.54286 17.8649C8.73141 17.8736 8.91632 17.9199 9.08673 18.001C9.25714 18.0821 9.40962 18.1965 9.53522 18.3374L11.8104 20.7769C12.455 21.4668 12.8785 21.9187 13.2242 22.2318C13.5642 22.5378 13.7115 22.5987 13.7696 22.6157C14.0473 22.7007 14.3434 22.6795 14.6168 22.5506C14.682 22.5194 14.8279 22.4302 15.1268 22.0717C15.4328 21.7077 15.7969 21.1934 16.3494 20.4128L24.3422 9.09933C24.4495 8.9473 24.5858 8.81791 24.7431 8.71854C24.9004 8.61917 25.0758 8.55178 25.2592 8.5202C25.4426 8.48863 25.6304 8.4935 25.8119 8.53453C25.9934 8.57556 26.1651 8.65194 26.317 8.75933Z" fill="white"/>
</svg>

  </div>

  <button onClick={handleAddLink} className="save-btn">Save</button>
</div>


    </>
      );
};

export default LinkManager;
