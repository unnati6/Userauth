import React, { useContext, useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../Api';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../context/Authcontext';
import Usernav from './Usernav';

const Userprofile = () => {
  const [formData, setFormData] = useState({
    fname:"",
    lname:"",  
    picture: null,
    email: '',
    password: '',
     });

  const { setUser } = useContext(Authcontext);
  const navigate = useNavigate();
  const [animateSave, setAnimateSave] = useState(false);


  // Fetch user profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getUserProfile();
        if (data && data.user) {
          setFormData({
            fname:data.user.fname || '',
            lname:data.user.lname || '',
            picture: null,
            email: data.user.email || '',
            password: '',
          
          });
        }
      } catch (error) {
        console.error("Failed to load profile", error);
      }
    };
    fetchProfile();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnimateSave(true);
    setTimeout(async ()=>{
      try {
        const form = new FormData();
        form.append('fname', formData.fname);
        form.append('lname', formData.lname);
        form.append('email', formData.email);
        form.append('password', formData.password);
        if (formData.picture) {
          form.append('picture', formData.picture);
        }
  
        const { data } = await updateUserProfile(form); // Make sure API supports multipart/form-data
        toast.success(data.message);
        setUser(data.user);
        setTimeout(() => navigate(`/user/${data.user.fname}/${data.user._id}`), 2000);
      } catch (error) {
        console.error("Update failed:", error);
        toast.error("Failed to update profile");
      } finally {
         setAnimateSave(false);
      }
    },300);
    
  };

  // Handle text/selection change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle file upload separately
  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, picture: e.target.files[0] }));
  };

  return (
    <>

      <div className={`main-container-updateprofile ${animateSave ?'slide-out' : ''}`}>
        <h1>Edit Profile</h1>
        <form className="updateform" onSubmit={handleSubmit}>
          <label>First Name</label>
          <input type="text" name="fname" value={formData.fname} onChange={handleChange} />
          <label>Last Name</label>
          <input type="text" name="lname" value={formData.lname} onChange={handleChange} />
          <label>Profile Picture</label>
          <input type="file" name="picture" onChange={handleFileChange} />
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="(Leave blank to keep current)"
          />

          <button type="submit">Update Profile</button>
        </form>
        <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      </div>
    </>
  );
};

export default Userprofile;
