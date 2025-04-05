import { createContext, useState, useEffect } from 'react';
import { getUserProfile } from '../Api';

export const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUserProfile();
        setUser(data.user);
      } catch (error) {
        console.log("User not authenticated", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <Authcontext.Provider value={{ user, setUser }}>
      {children}
    </Authcontext.Provider>
  );
};
