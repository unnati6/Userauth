import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './Users/Login';
import Signup from './Users/Signup';
import Userdash from './Users/Userdash';
import Userprofile from './Users/Userprofile';
import Preview from './Users/Preview';
import Passwordchange from './Users/Passwordchange';
import { AuthProvider } from './context/Authcontext';
import Privateroute from './components/Privateroute';
import LinkManager from './Links/LinkManager';
import { useEffect } from 'react';

// Routes wrapper for access to location
function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    const authPages = ['/login', '/signup', '/forget', '/link','/user/profilesetup'];
    const isAuthPage = authPages.includes(location.pathname);

    // Dynamic background
    if (location.pathname === '/forget' || location.pathname === '/preview') {
      document.body.style.backgroundImage = 'linear-gradient(180deg, #60B0FF 0%, #43A5B6 50%, #DA4A9B 100%)';
      document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundSize = 'cover'; // cover full screen
  document.body.style.backgroundAttachment = 'fixed'; // optional
    } else {
      document.body.style.backgroundImage = '';
    }

    // Fixed width, dynamic height
    document.body.style.width = '1728px';
    document.body.style.height = isAuthPage ? '1117px' : '1278px';
    document.body.style.backgroundColor = '#F8FAFC';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.position = 'relative';

    return () => {
      // Reset on route change
      document.body.style.backgroundImage = '';
      document.body.style.height = '';
      document.body.style.backgroundColor = '#F8FAFC';
    };
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forget" element={<Passwordchange />} />
      <Route path="/user/:fname/:userid" element={<Privateroute><Userdash /></Privateroute>} />
      <Route path="/user/profilesetup" element={<Privateroute><Userprofile /></Privateroute>} />
      <Route path="/link" element={<Privateroute><LinkManager /></Privateroute>} />
      <Route path="/preview" element={<Privateroute><Preview /></Privateroute>} />
    </Routes>
  );
}

// Main App
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
