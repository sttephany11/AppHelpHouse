import React, { createContext, useState, useContext } from 'react';


// Create the UserContext
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleSetUserId = (id) => {
    setUserId(id);  // Update state without persistent storage
  };

  const handleSetUserData = (data) => {
    setUserData(data);  // Update state without persistent storage
  };

  return (
    <UserContext.Provider value={{ userId, setUserId: handleSetUserId, userData, setUserData: handleSetUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
