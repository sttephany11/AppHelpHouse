// UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Cria o contexto
const UserContext = createContext();

// Provedor do contexto
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);

  return (
    <UserContext.Provider value={{ userId, setUserId, userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useUser = () => {
  return useContext(UserContext);
};
