import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext(); 

export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem('userEmail', userEmail);
    }
    if (userRole) {
      localStorage.setItem('userRole', userRole);
    }
    if (userName) {
      localStorage.setItem('userName', userName);
    }
  }, [userEmail, userRole, userName]);

  const clearUserData = () => {
    setUserEmail(''); 
    setUserRole('');
    setUserName('');
    localStorage.removeItem('userEmail'); 
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
  };

  return (
    <UserContext.Provider value={{ userEmail, setUserEmail, userRole, setUserRole, userName, setUserName, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext; 
