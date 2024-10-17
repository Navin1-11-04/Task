import React from 'react';
import background from '../../assets/worker_createbg.jpeg';

const CreateAccount = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div 
        className="w-1/2 h-screen flex bg-cover bg-center" 
        style={{ backgroundImage: `url(${background})` }}
      >
      </div>
    </div>
  );
};

export default CreateAccount;
