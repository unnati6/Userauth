import React, { useContext, useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../Api';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../context/Authcontext';
import Usernav from './Usernav';
const Userprofile = () => {
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    picture: '',
    email: '',
    password: ''
  });
  const {setUser} = useContext(Authcontext)
  const navigate = useNavigate();

  // Fetch current user profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getUserProfile();
        if (data && data.user) {
          setFormData({
            username: data.user.username || '',
            bio: data.user.bio || '',
            picture: data.user.picture || '',
            email: data.user.email,
            password: ''
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
    try {
      const { data } = await updateUserProfile(formData);
      toast.success(data.message);
      setTimeout(() => navigate(`/user/${data.user.username}/${data.user._id}`), 2000);
      setUser(data.user)
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
    <Usernav />
    <div className="main-container-updateprofile">
      <h1>Edit Profile</h1>
      <form className="updateform"onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />

        <label>Bio</label>
        <input type="text" name="bio" value={formData.bio} onChange={handleChange} />

        <label>Profile Picture URL</label>
        <input type="file" name="picture" value={formData.picture} onChange={handleChange} />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="(Leave blank to keep current)" />

        <button type="submit">Update Profile</button>
      </form>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </div>

    </>
      );
};

export default Userprofile;
