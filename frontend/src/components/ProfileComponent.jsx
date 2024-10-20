import React, { useContext } from 'react';
import UserContext from '../pages/UserContext';

const ProfileComponent = () => {
  const { userRole, username } = useContext(UserContext);

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <p>Your role is: {userRole}</p>
    </div>
  );
};

export default ProfileComponent;
