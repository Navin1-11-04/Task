import React, { createContext, useState, useEffect } from 'react';

// Create UserContext
export const UserContext = createContext(); // Use named export

// UserProvider component
export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || ''); // Store user email
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');

  // Update local storage when userEmail, userRole, or userName changes
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

  // Function to clear user data on logout
  const clearUserData = () => {
    setUserEmail(''); // Clear user email
    setUserRole('');
    setUserName('');
    localStorage.removeItem('userEmail'); // Remove user email from local storage
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
  };

  return (
    <UserContext.Provider value={{ userEmail, setUserEmail, userRole, setUserRole, userName, setUserName, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext; // Optional default export
