
import './App.css';

import {BrowserRouter as Router,Route, Routes,Navigate} from 'react-router-dom';
import Login from './Users/Login';
import Signup from './Users/Signup';
import Userdash from './Users/Userdash';
import Userprofile from './Users/Userprofile';
import { AuthProvider } from './context/Authcontext';
import Privateroute from './components/Privateroute'; 
import LinkManager from './Links/LinkManager';

function App() {
  return (
    <AuthProvider>
      <Router>
   <Routes>
    <Route path="/" element={<Navigate to="/signup"/>}/>
    
    <Route path="/Login" element={<Login />}/>
    <Route path="/signup" element={<Signup />}/>
    <Route path="/user/:username/:userid" element={<Userdash />}/>
    <Route path="/user/profilesetup" element={<Privateroute><Userprofile /></Privateroute>}/>
    <Route path="/link" element={<Privateroute><LinkManager /></Privateroute>}/>
   </Routes>
   </Router>
    </AuthProvider>
   
  );
}

export default App;
