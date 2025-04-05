import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { Authcontext } from '../context/Authcontext';

const Privateroute = ({ children }) => {
  const { user } = useContext(Authcontext);
  return user ? children : <Navigate to="/login" />;
};

export default Privateroute;
